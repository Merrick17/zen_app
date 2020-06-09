import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HeaderComponent } from "../header/header.component";
import { MenuComponent } from "../menu/menu.component";
import { PrincipalComponent } from "./principal.component";
import { Routes, RouterModule } from "@angular/router";

import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { UserlistComponent } from "./userlist/userlist.component";
import { AdduserComponent } from "./adduser/adduser.component";
const routes: Routes = [
  {
    path: "",

    component: PrincipalComponent,
    children: [
      {
        path: "users",
        component: UserlistComponent,
      },
      {
        path: "adduser",
        component: AdduserComponent,
      },
      {
        path: "",
        redirectTo: "users",
      },
    ],
  },
];
@NgModule({
  declarations: [
    HeaderComponent,
    MenuComponent,
    PrincipalComponent,

    UserlistComponent,
    AdduserComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
  ],
})
export class PrincipalModule {}
