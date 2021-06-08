import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public authStatus = new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAuthencated()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      this.authStatus.next(true);
    }
    return true;
  }

}
