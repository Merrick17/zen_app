import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environments/environment";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  register(data) {
    return this.http.post(this.BASE_URL + "/register", data);
  }

  login(data)
  {
    return this.http.post(this.BASE_URL + "/login", data);
  }
}
