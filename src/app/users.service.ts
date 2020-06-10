import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  getAllUsers() {
    let token = localStorage.getItem("token");
    return this.http.get(this.BASE_URL + "/users", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  deleteUser(id) {
    let token = localStorage.getItem("token");
    return this.http.delete(this.BASE_URL + "/user/delete/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
  updateUser(id, role) {
    let token = localStorage.getItem("token");
    return this.http.post(this.BASE_URL + "/user/edit/" + id, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }

  getUserDetails() {
    let token = localStorage.getItem("token");
    return this.http.get(this.BASE_URL + "/details", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
}
