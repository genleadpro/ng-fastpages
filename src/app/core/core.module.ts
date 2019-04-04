import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslatePipe } from '@ngx-translate/core';

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

export const createTranslateLoader = (http: HttpClient) => {
  /* for development
  return new TranslateHttpLoader(
      http,
      '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
      '.json'
  );*/
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
  imports: [
      CommonModule,
      HttpClientModule,
      NgxSpinnerModule,
      TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }
      }),
      JwtModule.forRoot({
        config: {
          throwNoTokenError: true,
          whitelistedDomains: [] ,
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
        }/*,
        {
          provide: PLATFORM_PIPES,
          useValue: TranslatePipe,
          multi: true
        }*/
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        throwIfAlreadyLoaded(parentModule, 'CoreModule');
    }
}
