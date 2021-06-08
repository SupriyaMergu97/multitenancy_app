import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const baseApi = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authStatus$ = new BehaviorSubject<boolean>(false);


  constructor(private user: UserService, private http: HttpClient,
  ) { }
  isAuthencated() {
    const token = this.user.getToken('authToken');
    return token ? true : false;
  }

  loginSuccess() {
    this.authStatus$.next(true);
  }

  createTenent(body): Observable<any> {
    return this.http.post(`${baseApi}/api/v1/admin/create`, body);
  }

  getTenant() {
    return this.http.get(`${baseApi}/getAll`);
  }

  login(body) {
    return this.http.post(`${baseApi}/api/v1/admin`, body);
  }

  createUser(body) {
    return this.http.post(`${baseApi}/api/v1/users`, body);
  }


  fetchUser() {
    return this.http.get(`${baseApi}/api/v1/users`);
  }




  destroy() {
    this.user.removeToken('authToken');
    this.authStatus$.unsubscribe();
  }

}
