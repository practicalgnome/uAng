import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered?:	string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpiration));

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expDuration = new Date(userData._tokenExpiration).getTime() - new Date().getTime();
      this.autoLogout(expDuration);
    }
  }

  onSignUp(formData) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDF48fy1Koc1q4Dtxg1ZY1etd7onqLluUU',
      {
        email: formData.email,
        password: formData.password,
        returnSecureToken: true
      }).pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuth(resData);
        })
      );
  }

  onLogin(formData) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDF48fy1Koc1q4Dtxg1ZY1etd7onqLluUU',
      {
        email: formData.email,
        password: formData.password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuth(resData);
      }));
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expDuration);
  }

  private handleAuth(resData: AuthResponseData) {
    const expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    const user = new User(
      resData.email,
      resData.localId,
      resData.idToken,
      expDate);
    this.user.next(user);
    this.autoLogout(+resData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage: string;
    switch (errorRes.error.error.message) {
      case 'INVALID_PASSWORD':
        errorMessage = 'Password is invalid. Try again.';
        break;
      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      default:
        errorMessage = 'Error occurred. Try again.';
    }
    return throwError(errorMessage);
  }
}
