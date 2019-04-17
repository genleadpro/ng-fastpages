import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { ContentLayoutComponent } from './layouts/content-layout/content-layout.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent} from './layouts/sidebar/sidebar.component';
import { TopnavComponent } from './layouts/topnav/topnav.component';

import { AuthModule } from './modules/auth/auth.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrderComponent } from './modules/order/order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentLayoutComponent,
    TopnavComponent,
    SidebarComponent,
    FooterComponent,
    AuthLayoutComponent,
    OrderComponent
  ],
  imports: [
    // Angular
    BrowserModule,

    // 3rd party
    AuthModule,

    // core & shared
    CoreModule,
    SharedModule,

    // app
    AppRoutingModule,

    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
