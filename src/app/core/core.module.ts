import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { NgxSpinnerModule } from 'ngx-spinner';

import { throwIfAlreadyLoaded } from './guards/module-import.guard';

import { JWT_OPTIONS, JwtInterceptor, JwtModule } from '@auth0/angular-jwt';
import { RefreshTokenInterceptor } from '@app/core/interceptors/refresh-token.interceptor';
import { AuthorizationService } from '@app/core/services/authorization.service';
import { environment } from '@env/environment';

function jwtOptionsFactory (authorizationService: AuthorizationService) {
  return {
    tokenGetter: () => {
      return authorizationService.getAccessToken();
    },
  };
}

@NgModule({
    imports: [
  CommonModule,
      HttpClientModule,
      NgxSpinnerModule,

      JwtModule.forRoot({
        config: {
          throwNoTokenError: true,
          whitelistedDomains: [ /^null$/ ], // work around to by pass its bugs //environment.whiteLists,
          authScheme: 'Bearer ',
          skipWhenExpired: false
        },
        jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: jwtOptionsFactory,
          deps: [AuthorizationService]
        }
      })
    ],
    providers: [
        AuthGuard,
        NoAuthGuard,
        AuthorizationService,
        JwtInterceptor, // Providing JwtInterceptor allow to inject JwtInterceptor manually into RefreshTokenInterceptor
        {
          provide: HTTP_INTERCEPTORS,
          useExisting: JwtInterceptor,
          multi: true
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: RefreshTokenInterceptor,
          multi: true
        }
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
