import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {}

  logout() {
    this.auth.logout().subscribe(
      (data) => {
        let result: any = data;
        localStorage.clear();
        this.router.navigate([""]);
      },
      (err) => {
        if (err) {
          console.log(err);
          
          localStorage.clear();
          this.router.navigate([""]);
        }
      }
    );
  }
}
