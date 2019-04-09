import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const BASE_URL = env.serverUrl;
const PUBLIC_TENANT_SERVICES = [
  '/users/', '/users/me/'
];

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  private fileOptions = { headers: new HttpHeaders().set('Accept', 'application/json')} ;

  constructor(private httpClient: HttpClient) {}

  private resovleBaseUrl(path: string) : string {
    if (PUBLIC_TENANT_SERVICES.find(x=> x == path))
      return BASE_URL;
    let tenant_url = localStorage.getItem('tenant_url');
    if (tenant_url)
      return env.apiProtocol + '://' + tenant_url + ':'+ env.apiPort + env.apiPath;
    return '';
  }

  public get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.httpClient.get(this.resovleBaseUrl(path) + path, { params }).pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .put(this.resovleBaseUrl(path) + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(this.resovleBaseUrl(path) + path, JSON.stringify(body), this.options)
      .pipe(catchError(this.formatErrors));
  }

  public postFormData(path: string, body: object = {}): Observable<any> {
    return this.httpClient
      .post(this.resovleBaseUrl(path) + path, body, this.fileOptions)
      .pipe(catchError(this.formatErrors));
  }

  public delete(path: string): Observable<any> {
    return this.httpClient.delete(this.resovleBaseUrl(path) + path).pipe(catchError(this.formatErrors));
  }

  public formatErrors(error: any): Observable<any> {
    return throwError(error.error);
  }
}
