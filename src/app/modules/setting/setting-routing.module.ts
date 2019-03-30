import { Routes, RouterModule } from '@angular/router';
import { SettingComponent } from './pages/setting/setting.component';

const routes: Routes = [
  {
    path: '',
    component: SettingComponent
  }
];

export const SettingRoutes = RouterModule.forChild(routes);
