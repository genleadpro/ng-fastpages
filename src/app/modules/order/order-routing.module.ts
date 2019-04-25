import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './pages/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent
  }
];

export const OrderRoutes = RouterModule.forChild(routes);
