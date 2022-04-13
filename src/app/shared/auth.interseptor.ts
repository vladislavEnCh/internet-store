import { AuthService } from './services/auth.service';

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterseptor implements HttpInterceptor {
  constructor(private auth: AuthService, private rout: Router) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token,
        },
      });
    }
    return next.handle(req).pipe(
      catchError((error) => {
        if (error.status === 401) {
          this.auth.logout();
          this.rout.navigate(['/admin', 'login']);
        }
        return throwError(error);
      })
    );
  }
}
