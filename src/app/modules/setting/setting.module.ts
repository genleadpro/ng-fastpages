import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { SettingRoutes } from './setting-routing.module';
import { SettingComponent } from './pages/setting.component';
import { SettingEditComponent } from './pages/setting-edit/setting-edit.component';


@NgModule({
  declarations: [ SettingComponent, SettingEditComponent ],
  imports: [
    SettingRoutes,

    SharedModule
  ]
})
export class SettingModule { }
