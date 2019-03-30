import { Component, OnInit, Input } from '@angular/core';

import { PageModel } from '@app/core';

@Component({
  selector: 'app-page-item',
  templateUrl: './page-item.component.html',
  styleUrls: ['./page-item.component.scss'],
})
export class PageItemComponent implements OnInit {
  @Input() page: PageModel;

  constructor() { }

  ngOnInit() {}

}
