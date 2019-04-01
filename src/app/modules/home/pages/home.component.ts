import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
    private chageDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadPages();
  }

  loadPages() {
    this.pages$ = this.pageService.getAll();
  }

  onAddClicked() {
    this.router.navigate(['../pages/add'], { relativeTo: this.route });
  }

  onEditClicked(id: number) {
    this.router.navigate(['../pages/' + id + '/edit'], { relativeTo: this.route });
    console.log('Row edit clicked: ', id);
  }

  onDeleteClicked(id: number) {
    console.log('Row delete clicked: ', id);
    this.pageService.deletePage(id).subscribe(data => {
      this.dataSource.disconnect();
      this.dataSource.connect();
    });

  }

  refresh() {
    this.chageDetector.detectChanges();
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
