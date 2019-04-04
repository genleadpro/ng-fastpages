import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { AuthorizationService } from '@app/core/services/authorization.service';
import { JwtInterceptor } from '@auth0/angular-jwt';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor (private authorizationService: AuthorizationService, private jwtInterceptor: JwtInterceptor) {
  }

  /**
   * we not verify if access token expired or not, just wait for error response
   * If error.code === 'token_not_valid', then access token expired. Inititate refresh token first
   * **/
  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Intercept request");
    // TODO: Verify this "isWhitelistDomain() bug"
    if (/* this.jwtInterceptor.isWhitelistedDomain(req) && */!this.jwtInterceptor.isBlacklistedRoute(req)) {
      return next.handle(req).pipe(
        catchError((err) => {
          const errorResponse = err as HttpErrorResponse;
          console.log("Got error response.", err);
          if (errorResponse.status === 401 && errorResponse.error.code === 'token_not_valid') {
            console.log('Got "token_not_valid" message, refresh access token..');
            return this.authorizationService.refresh().pipe(mergeMap(() => {
              // success
              return this.jwtInterceptor.intercept(req, next);
            }));
          }
          if (errorResponse.status === 400) {
            // need user login again if refresh token expired
            return throwError({ error: 'token expired'});
          }
          return throwError(err);
        }));
    } else {
      return next.handle(req);
    }
  }
}
