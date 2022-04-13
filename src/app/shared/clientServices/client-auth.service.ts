import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { tap, catchError, Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientAuthService {
  constructor(private http: HttpClient) {}
  public error$: Subject<string> = new Subject<string>();

  public hendleError(error: HttpErrorResponse): Observable<string> {
    const message = error.error.messsage;
    this.error$.next(message);
    console.log('errore', message);
    return throwError(error);
  }
  get token(): any {
    const expDate: any = localStorage.getItem('backend-TokenExp');
    if (Date.now() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('backend-Token');
  }
  registration(body: any) {
    return this.http
      .post('http://localhost:5000/api/auth/register', body)
      .pipe(catchError(this.hendleError.bind(this)));
  }
  public login(user: any) {
    return this.http
      .post('http://localhost:5000/api/auth/login', user)
      .pipe(catchError(this.hendleError.bind(this)), tap(this.setToken))
      .subscribe((res) => console.log(res));
  }
  private setToken(res: any) {
    if (res) {
      const expData = new Date(new Date().getTime() + +res.expiresIn * 1000);
      localStorage.setItem('backend-TokenExp', expData.toString());
      localStorage.setItem('backend-Token', res.idToken);
    } else {
      localStorage.clear();
    }
  }

  public logout() {
    this.setToken(null);
  }

  public isAuthenticated() {
    return !!this.token;
  }
}
