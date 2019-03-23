import { Injectable } from '@angular/core';

import { JsonApiService } from './json-api.service';
import { Observable } from 'rxjs';

import { Page } from '../models/page.model';
import { ApiService } from './api.service';

const routes = {
    pages: '/pages',
    page: (id: number) =>  `/pages/${id}`
};

@Injectable({
  providedIn: 'root'
})
export class PageService {

    constructor(
      private jsonApiService: JsonApiService,
      private apiService: ApiService) {}

    getAll(): Observable<Page[]> {
        return this.apiService.get(routes.pages);
    }

    getSingle(id: number): Observable<Page> {
        return this.apiService.get(routes.page(id));
    }

}
