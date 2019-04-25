import { Injectable } from '@angular/core';

import { JsonApiService } from './json-api.service';
import { Observable } from 'rxjs';

import { OrderModel } from '@app/core';
import { ApiService } from './api.service';

const routes = {
  orders: '/orders/',
  order: (id: number) => `/orders/${id}/`,
  add: '/orders/',
  update: (id: number) => `/orders/${id}/`,
  delete: (id: number) => `/orders/${id}/`
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {

    constructor(
      private jsonApiService: JsonApiService,
      private apiService: ApiService) {}

    getAll(): Observable<OrderModel[]> {
        return this.apiService.get(routes.orders);
    }

    getSingle(id: number): Observable<OrderModel> {
        return this.apiService.get(routes.order(id));
    }

    addComplexOrder(order: FormData) {
      return this.apiService.postFormData(routes.add, order);
    }

    updateOrder(id: number, order: FormData) {
      return this.apiService.putFormData(routes.update(id), order);
    }

    deleteOrder(id: number) {
      return this.apiService.delete(routes.delete(id));
    }

}
