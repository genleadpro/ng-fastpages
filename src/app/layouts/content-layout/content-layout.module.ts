import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopnavComponent } from '../topnav/topnav.component';
import { ContentLayoutComponent } from './content-layout.component';
import { NavComponent } from '../nav/nav.component';

@NgModule({
  imports: [
      CommonModule,
      MatToolbarModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatInputModule,
      MatMenuModule,
      MatListModule,
      //TranslateModule
  ],
  declarations: [ContentLayoutComponent, NavComponent, TopnavComponent, SidebarComponent]
})
export class ContentLayoutModule {}
