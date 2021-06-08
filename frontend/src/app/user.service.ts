import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  setToken(key, value) {
    localStorage.setItem(key, value);
  }

  getToken(key) {
    return localStorage.getItem(key);
  }

  removeToken(key) {
    return localStorage.removeItem(key);
  }
}
