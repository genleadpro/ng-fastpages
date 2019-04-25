import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';
import { OrderRoutes } from './order-routing.module';
import { OrderComponent } from './pages/order/order.component';


@NgModule({
  declarations: [OrderComponent],
  imports: [
    OrderRoutes,

    SharedModule
  ]
})
export class OrderModule { }
