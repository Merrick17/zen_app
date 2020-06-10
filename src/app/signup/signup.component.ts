import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "./mismatch.validator";
import { AuthService } from "../auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService
  ) {
    this.registerForm = this.formBuilder.group(
      {
        name: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required]],
        c_password: ["", [Validators.required]],
      },
      {
        validator: MustMatch("password", "c_password"),
      }
    );
  }
  onSubmit() {
    this.submitted = true;

    //this.spinner.show();
    // stop here if form is invalid
    console.log(this.registerForm);
    if (this.registerForm.invalid) {
      return;
    } else {
      this.auth.register(this.registerForm.value).subscribe(
        (data) => {
          let result: any = data;
          if (result.success != null && result.success != undefined) {
            localStorage.setItem("token", result.success.token);
          }
          console.log(result);
        },
        (err) => {
          console.log(err);
          this.toastr.warning("Erreur!", "Email déja existant !");
        }
      );
    }
  }
  ngOnInit() {

  }
}
