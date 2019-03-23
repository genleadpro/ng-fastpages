import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { AuthenticationService } from '@app/core/services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentAuthResult = this.authenticationService.getAuthResult;
    if (currentAuthResult && currentAuthResult.access) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${currentAuthResult.access}`
            }
        });
    }

    return next.handle(request);
  }
}
