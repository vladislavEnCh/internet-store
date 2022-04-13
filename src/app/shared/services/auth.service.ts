import { IUser } from './../interfaces/auth.interfaces';
import { environment } from '../../../environments/environment.prod';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  get token(): any {
    const expDate: any = localStorage.getItem('fire-Base-TokenExp');
    if (Date.now() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fire-Base-Token');
  }

  public login(user: IUser) {
    return this.http
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`,
        user
      )
      .pipe(tap(this.setToken));
  }
  public logout() {
    this.setToken(null);
  }

  public isAuthenticated() {
    return !!this.token;
  }

  private setToken(res: any) {
    if (res) {
      const expData = new Date(new Date().getTime() + +res.expiresIn * 1000);
      localStorage.setItem('fire-Base-TokenExp', expData.toString());
      localStorage.setItem('fire-Base-Token', res.idToken);
    } else {
      localStorage.clear();
    }
  }
}
