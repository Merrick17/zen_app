import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) {}

  register(data) {
    return this.http.post(this.BASE_URL + "/register", data);
  }

  login(data) {
    return this.http.post(this.BASE_URL + "/login", data);
  }

  // ...
  public isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    let token = localStorage.getItem("token");
    return this.http.post(this.BASE_URL + "/logout", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  }
}
