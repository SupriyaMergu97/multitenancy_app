import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { CONSTANTS } from './shared/constants';


@Injectable({
  providedIn: 'root'
})
export class AppInterceptorService {

  constructor(private user: UserService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.user.getToken(CONSTANTS.TOKEN_KEY);
    const dbName = this.user.getToken(CONSTANTS.DB_NAME_KEY);
    const headers = req.headers.set('Authorization', `Bearer ${token}`)
      .set('dbName', dbName ? dbName : CONSTANTS.MASTER_DB);
    req = req.clone({ headers });
    return next.handle(req);
  }
}
