import { Injectable, } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { PageModel, PageService } from '@app/core';

@Injectable({
  providedIn: 'root'
})
export class PageResolver implements Resolve<PageModel> {
  constructor(
    private pageService: PageService,
    private router: Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {

    return this.pageService.getSingle(route.params['id'])
      .pipe(catchError((err) => this.router.navigateByUrl('/')));
  }
}
