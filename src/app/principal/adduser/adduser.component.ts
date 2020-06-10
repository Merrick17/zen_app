import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth.service";
import { ToastrService } from "ngx-toastr";
import { MustMatch } from "src/app/signup/mismatch.validator";
import { Router } from "@angular/router";

@Component({
  selector: "app-adduser",
  templateUrl: "./adduser.component.html",
  styleUrls: ["./adduser.component.scss"],
})
export class AdduserComponent implements OnInit {
  registerForm: FormGroup;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
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
            this.router.navigate(["/principal"]);
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
  ngOnInit() {}
}
