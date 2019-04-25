import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './pages/setting.component';
import { SettingEditComponent } from './pages/setting-edit/setting-edit.component';

const routes: Routes = [

  {
    path: 'edit',
    component: SettingEditComponent
  },
  {
    path: '',
    component: SettingComponent
  },
];

export const SettingRoutes = RouterModule.forChild(routes);
