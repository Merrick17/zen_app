import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "principal",
    loadChildren: "./principal/principal.module#PrincipalModule",
    canActivate: [AuthGuard],
  },
  {
    path: "user",
    loadChildren: "./user/user.module#UserModule",
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
