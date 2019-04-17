import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, ReplaySubject, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@env/environment';
import { LoginResponse } from '@app/core/models/loginresponse.model';
import { User } from '@app/core/models';
import { UserService } from '@app/core/services/user.service';
import * as jwtDecode from 'jwt-decode';



@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  constructor (private httpClient: HttpClient, private userService : UserService) {
  }

  accessTokenUrl = `${environment.authEndpoint}/token/`;
  refreshTokenUrl = `${environment.authEndpoint}/token/refresh/`;

  login (email: string, password: string): Observable<LoginResponse> {
    const body = new HttpParams()
      .set('email', email)
      .set('password', password);

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const postObservable = this.httpClient.post<LoginResponse>(this.accessTokenUrl, body.toString(), { headers });

    const subject = new ReplaySubject<LoginResponse>(1);
    subject.subscribe((r: LoginResponse) => {

      this.setAccessToken(r.access);
      this.setRefreshToken(r.refresh);
      this.setTenantData(jwtDecode(r.access));
      this.updateCurrentUser();
    }, (err) => {
      this.handleAuthenticationError(err);
    });

    postObservable.subscribe(subject);
    return subject;
  }

  refresh (): Observable<LoginResponse> {
    const body = new HttpParams().set('refresh', this.getRefreshToken());

    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    const refreshObservable = this.httpClient.post<LoginResponse>(this.refreshTokenUrl, body.toString(), { headers });

    const refreshSubject = new ReplaySubject<LoginResponse>(1);
    refreshSubject.subscribe((r: LoginResponse) => {

      this.setAccessToken(r.access);
      // Currently refresh token will not provided (depends on Django SimpleJWT server configuration)
      // this.setRefreshToken(r.refresh);
      this.setTenantData(jwtDecode(r.access));
      this.updateCurrentUser();
    }, (err) => {
      this.handleRefreshTokenError(err);
    });

    refreshObservable.subscribe(refreshSubject);
    return refreshSubject;
  }

  logout () {
    this.setAccessToken(null);
    this.setRefreshToken(null);
    this.setCurrentUser(null);
    this.setTenantData(null);
  }

  /**
   * User is still logined if refresh token is not expired.
   * As system will automatially refresh new access token.
   */
  isAuthenticated (): boolean {
    const jwtHelper = new JwtHelperService();
    return !jwtHelper.isTokenExpired(this.getRefreshToken());
  }

  private handleAuthenticationError (err: any) {
    // TODO: Only for authentication error codes
    this.setAccessToken(null);
    this.setRefreshToken(null);
    this.setCurrentUser(null);
    this.setTenantData(null);
    if (err.status == 400) {
      if ("non_field_errors" in err.error) {
        console.log(err.error['non_field_errors']);
        return throwError(err.error['non_field_errors']);
      }
    }
  }

  private handleRefreshTokenError (err: any) {
    console.log(err);
  }

  private setAccessToken (accessToken: string) {
    if (!accessToken) {
      localStorage.removeItem('access_token');
    } else {
      localStorage.setItem('access_token', accessToken);
    }
  }

  private setRefreshToken (refreshToken: string) {
    if (!refreshToken) {
      localStorage.removeItem('refresh_token');
    } else {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  private setTenantData(decodedToken) {
    if (!decodedToken) {
      localStorage.removeItem('tenant_name');
      localStorage.removeItem('tenant_url');
    } else {
      localStorage.setItem('tenant_name', decodedToken.tenant_name);
      localStorage.setItem('tenant_url', decodedToken.tenant_url);
    }
  }

  private setCurrentUser(user: User) {
    if (!user) {
      localStorage.removeItem('current_user');
      localStorage.removeItem('current_tenant');
    } else {
      localStorage.setItem('current_user', JSON.stringify(user));
      if (user.tenants.length > 0 ) {
        let current_tenant = user.tenants[0];
        localStorage.setItem('current_tenant', JSON.stringify(current_tenant))
      }

    }
  }

  getAccessToken () {
    return localStorage.getItem('access_token');
  }

  getRefreshToken () {
    return localStorage.getItem('refresh_token');
  }

  updateCurrentUser() {
    console.log('Try to subscribe to me, to update current user');
    this.userService.me().subscribe(
      data => { this.setCurrentUser(data)}
    );
  }

  getCurrentTenant() : any {
    return JSON.parse(localStorage.getItem('current_tenant'));
  }

  getLoggedInUser() : User {
    return JSON.parse(localStorage.getItem('current_user'))
  }
}
