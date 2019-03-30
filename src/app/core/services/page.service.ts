import { Injectable } from '@angular/core';

import { JsonApiService } from './json-api.service';
import { Observable } from 'rxjs';

import { PageModel } from '../models/page.model';
import { ApiService } from './api.service';

const routes = {
  pages: '/pages/',
  page: (id: number) => `/pages/${id}/`,
  add: '/pages/',
  edit: (id: number) => `/pages/${id}/edit/`,
};

@Injectable({
  providedIn: 'root'
})
export class PageService {

    constructor(
      private jsonApiService: JsonApiService,
      private apiService: ApiService) {}

    getAll(): Observable<PageModel[]> {
        return this.apiService.get(routes.pages);
    }

    getSingle(id: number): Observable<PageModel> {
        return this.apiService.get(routes.page(id));
    }

    addPage(page: PageModel) {
      return this.apiService.post(routes.add, page);
    }

}
