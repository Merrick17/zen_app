import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { UsersService } from "src/app/users.service";
import Swal from "sweetalert2";
import { NgxSpinnerService } from "ngx-spinner";
import { ExportToCsv } from "export-to-csv";
import { Chart } from "chart.js";
import * as groupArray from "group-array";
@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.scss"],
})
export class UserlistComponent implements OnInit {
  usersList = [];
  @ViewChild("lineCanvas") lineCanvas: ElementRef;
  private lineChart: Chart;
  constructor(
    private users: UsersService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.getUsers();
  }

  ExportToCSV() {
    const options = {
      fieldSeparator: ",",
      quoteStrings: '"',
      decimalSeparator: ".",
      showLabels: true,
      showTitle: true,
      title: "Liste Utilisateurs ",
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.usersList);
  }

  getUsers() {
    this.users.getAllUsers().subscribe(
      (data) => {
        let result: any = data;
        this.usersList = result.data;
        console.log(result);
        this.initData();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteUser(id) {
    Swal.fire({
      title: "Etes Vous sure?",
      text: "Vous ete entrain de supprimer cet utilisateur veuillez confirmer ",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    }).then((result) => {
      if (result.value) {
        this.spinner.show();
        this.users.deleteUser(id).subscribe(
          (data) => {
            let result: any = data;
            if (result.status != null && result.status == "success") {
              Swal.fire(
                "Supprimer!",
                "L'utilisateur a été supprimé",
                "success"
              );
              this.getUsers();
              this.spinner.hide();
            }
            console.log(data);
            //
          },
          (err) => {
            console.log(err);
          }
        );

        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }

  initData() {
    let mapedUsers = [];

    this.usersList.forEach((elm) => {
      let date = new Date(elm.created_at).toDateString();
      console.log(date);
      mapedUsers.push({
        id: elm.id,
        date: date,
        dates: new Date(elm.created_at),
      });
    });
    let result = groupArray(mapedUsers, "date");
    console.log("users", result);
    let myLabels = Object.keys(result);
    console.log(myLabels);
    let DataValues = Object.values(result);
    console.log(DataValues);
    let valueLength = DataValues.map((elm: any) => elm.length);
    console.log("my result", valueLength);

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: myLabels,
        datasets: [
          {
            label: "Liste utilisateurs par jours ",
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: valueLength,
            spanGaps: false,
          },
        ],
      },
    });
  }
}
