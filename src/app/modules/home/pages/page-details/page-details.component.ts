import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PageModel } from '@app/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-page-details',
  templateUrl: './page-details.component.html',
  styleUrls: ['./page-details.component.scss']
})
export class PageDetailsComponent implements OnInit {
  page$: Observable<PageModel>;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.page$ = this.route.data.pipe(map((data) => data.page));
  }

}
