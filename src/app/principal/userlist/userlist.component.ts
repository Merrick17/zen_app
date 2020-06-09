import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/app/users.service";
import Swal from "sweetalert2";
@Component({
  selector: "app-userlist",
  templateUrl: "./userlist.component.html",
  styleUrls: ["./userlist.component.scss"],
})
export class UserlistComponent implements OnInit {
  usersList = [];
  constructor(private users: UsersService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.users.getAllUsers().subscribe(
      (data) => {
        let result: any = data;
        this.usersList = result.data;
        console.log(result);
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
        Swal.fire("Supprimer!", "L'utilisateur à étét supprimé", "success");
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  }
}
