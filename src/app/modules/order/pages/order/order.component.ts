import { Component, OnInit,  ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { OrderService, OrderModel } from '@app/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  isLoading: boolean;
  orders: OrderModel[];
  dataSource: MatTableDataSource<OrderModel>; //new PageDataSource(this.pageService);
  @ViewChild(MatPaginator)  paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns = [
    'select',
    'full_name', 'order_date', 'order_amount',
    'district', 'province', 'actions'
    ];


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private chageDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadOrders();
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  loadOrders() {
    this.isLoading = true;
    this.orderService.getAll().subscribe(data => {
      this.dataSource =  new MatTableDataSource();
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.data = data;
      this.orders = data;
      this.isLoading = false;
    },
    error => this.isLoading = false);
  }

  refresh() {
    this.chageDetector.detectChanges();
  }


  onDeleteClicked(id: number) {
    this.orderService.deleteOrder(id).subscribe(data => {

    });

  }
  selectAll() {
    for(let order of this.orders) {
      order.selected = !order.selected;
    }
  }
}
