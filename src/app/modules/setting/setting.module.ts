import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { SettingRoutes } from './setting-routing.module';
import { SettingComponent } from './pages/setting/setting.component';


@NgModule({
  declarations: [SettingComponent],
  imports: [
    SettingRoutes,

    SharedModule
  ]
})
export class SettingModule { }
