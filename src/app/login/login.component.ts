import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  login: string = "";
  mdp: string = "";
  error: boolean;
  loginForm: FormGroup;
  submitted: boolean;
  constructor(
    private auth: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    console.log(this.loginForm);
    //this.spinner.show();
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      console.log(this.loginForm.controls.email.errors.required);
      return;
    } else {
      this.auth.login(this.loginForm.value).subscribe(
        (data) => {
          let result: any = data;
          if (result.status) {
            localStorage.setItem("token", result.success.token);
            this.router.navigate(["/principal"]);
          } else {
            this.toastr.warning(
              "Erreur!",
              "Adresse ou mot de passe incorrecte!"
            );
          }

          console.log(result);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
