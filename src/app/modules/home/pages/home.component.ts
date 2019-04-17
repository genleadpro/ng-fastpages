import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PageService, PageModel } from '@app/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pages: PageModel[];
  dataSource: MatTableDataSource<PageModel>; //new PageDataSource(this.pageService);
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = ['select', 'name', 'slug', 'status', 'actions'];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pageService: PageService,
    private chageDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadPages();
  }

   /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  loadPages() {
    this.pageService.getAll().subscribe(data => {
      this.dataSource =  new MatTableDataSource();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.data = data;
      this.pages = data;
    });
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

    });

  }

  refresh() {
    this.chageDetector.detectChanges();
  }

  selectAll() {
    for(let page of this.pages) {
      page.selected = !page.selected;
    }
  }

}

