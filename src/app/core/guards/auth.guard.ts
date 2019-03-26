import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from '@app/core/services';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private auth: AuthorizationService, private router: Router) {}

    canActivate(): boolean {
        if (!this.auth.isAuthenticated()) {
          this.router.navigate(['auth/login']);
          return false;
        }

        return true;
    }

}
