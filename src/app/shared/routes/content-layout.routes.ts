import { Routes } from '@angular/router';

export const CONTENT_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: 'settings',
    loadChildren: './modules/setting/setting.module#SettingModule'
  },
  {
    path: 'about',
    loadChildren: './modules/about/about.module#AboutModule'
  },
];
