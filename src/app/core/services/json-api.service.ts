
import { throwError as observableThrowError,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, map, catchError } from 'rxjs/operators';

import { config } from '../app-config';

@Injectable({
  providedIn: 'root'
})
export class JsonApiService {

    constructor(private httpClient: HttpClient) { }

    fetch(url): Observable<any> {
        return this.httpClient.get(this.getBaseUrl() + url)
            .pipe(
                delay(100),
                catchError(this.handleError)
            );
    }

    private getBaseUrl() {
        return `${location.protocol}//${location.hostname + (location.port ? ':' + location.port : '')}/`;
    }

    private handleError(error: any) {
        const errorMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        return observableThrowError(errorMsg);
    }

}
