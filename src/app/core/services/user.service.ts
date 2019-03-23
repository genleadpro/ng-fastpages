import { Injectable } from '@angular/core';

import { JsonApiService } from './json-api.service';
import { ApiService } from './api.service';
import { User } from '../models';
import { Observable } from 'rxjs';


const routes = {
    users: '/users/',
    me: '/users/me/'
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _loggedInUser: User;
  constructor(
    private jsonApiService: JsonApiService,
    private apiService: ApiService) {}

  me() : Observable<any> {
      return this.apiService.get(routes['me']);
  }

  getAll() {
        // this.
  }

  getById(id: number) {

  }



}
