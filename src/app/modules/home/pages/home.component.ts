import { Component, OnInit } from '@angular/core';
import { DataSource} from '@angular/cdk/collections';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PageService, PageModel } from '@app/core';
import { UserService } from '@app/core/services/user.service';
import { User } from '@app/core/models/user.model';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dataSource = new PageDataSource(this.pageService);
  displayedColumns = ['name', 'slug', 'status', 'actions'];
  pages$: Observable<PageModel[]>;
  user : User;
  count : number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadPages();
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

  onRowClicked(row) {
    console.log('Row clicked: ', row);
  }

  onEditClicked(id: number) {
    this.router.navigate(['../pages/' + id + '/edit'], { relativeTo: this.route });
    console.log('Row edit clicked: ', id);
  }

  onDeleteClicked(id: number) {

    console.log('Row delete clicked: ', id);
  }
}

export class PageDataSource extends DataSource<any> {
  constructor(private pageService: PageService) {
    super();
  }
  connect(): Observable<PageModel[]> {
    return this.pageService.getAll();
  }
  disconnect() {}
}
