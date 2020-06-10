import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";

import { Routes, RouterModule } from "@angular/router";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserComponent } from "./user.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  {
    path: "",

    component: UserComponent,
    children: [{ path: "", component: ProfileComponent }],
  },
];
@NgModule({
  declarations: [UserComponent,ProfileComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UserModule {}
