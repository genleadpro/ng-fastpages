import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  APP_TITLE = 'ng-fastpages';

  constructor() { }

  ngOnInit(): void { }

}
