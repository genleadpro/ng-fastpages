import { Routes, RouterModule } from '@angular/router';
import { OrderComponent } from './order/pages/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent
  }
];

export const OrderRoutes = RouterModule.forChild(routes);
