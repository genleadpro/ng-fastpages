import { Component, OnInit } from '@angular/core';
import { PageService, Page } from '@app/core';
import { UserService } from '@app/core/services/user.service';
import { Observable } from 'rxjs';
import { User } from '@app/core/models/user.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pages$: Observable<Page[]>;
  user : User;
  count : number = 0;

  constructor(
        private pageService: PageService,
        private userService: UserService
    ) { }

  ngOnInit(): void {
      // this.loadPages();
  }

  loadPages() {
    this.pages$ = this.pageService.getAll();
  }

  getMe() {
    console.log('Get me button clicked');
    this.userService.me().subscribe((data: User)=> {
      this.user = data;
      console.log(data);
    });
  }

  incrementCount() {
    this.count += 1;
  }

}
