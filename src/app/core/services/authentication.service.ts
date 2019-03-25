import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IAuthResult } from '@app/core/models/authresult.model';
import { environment } from '@env/environment';

export class IMyLoginContext {
  username: string;
  password: string;
  token: string;
}
const AuthResponseItem: string = 'authResult';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private authResultSubject: BehaviorSubject<IAuthResult>;
  public authResult: Observable<IAuthResult>;
  constructor(private http: HttpClient) {
    this.authResultSubject = new BehaviorSubject<IAuthResult>(JSON.parse(localStorage.getItem('currentUser')));
    this.authResult = this.authResultSubject.asObservable();
  }

  public get getAuthResult(): IAuthResult {
    return this.authResultSubject.value;
  }

  login(email: string, password: string) {

    return this.http.post<any>(`${environment.authEndpoint}/token/`, { 'email': email, 'password': password })
      .pipe(
        map(
          response => {
            // login successful if there's a jwt access token in the response
            if (response && response.access) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem(AuthResponseItem, JSON.stringify(response));
              this.authResultSubject.next(response); //set value

              let jwtHelper = new JwtHelperService();
              let expiredAt = jwtHelper.getTokenExpirationDate(response.access);
              console.log(expiredAt);
              console.log(jwtHelper.decodeToken(response.access));
            }

          return response;
        }
      ));
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(AuthResponseItem);
    this.authResultSubject.next(null);
  }

  public renewToken() : Observable<IAuthResult> {
    let authResponse = JSON.parse(localStorage.getItem(AuthResponseItem));
    let token = authResponse.refresh; // refresh is refreshToken

    return this.http.post<IAuthResult>(`${environment.authEndpoint}/token/refresh`,  { 'token': token })
    .pipe(
        map(resp => {

          if (resp && resp.access) {
            localStorage.setItem(AuthResponseItem, JSON.stringify(resp));
          }

          return resp;
        })
    );
  }

  get accessToken() : string {
    let authResponse = JSON.parse(localStorage.getItem(AuthResponseItem));

    if(authResponse != null) {
      return authResponse.access; // JWT access token
    }

    return '';
  }

  get refreshToken() : string {
    let authResponse = JSON.parse(localStorage.getItem(AuthResponseItem));

    if(authResponse != null) {
      return authResponse.refresh; // JWT access token
    }

    return '';
  }

  isAuthenticated() : boolean {
    const jwtHelper = new JwtHelperService();
    const token = this.accessToken;
    // Check whether the token is expired and return
    // true or false
    return !jwtHelper.isTokenExpired(token);

  }
}
