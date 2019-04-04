import {
  Component,
  OnInit,
  ViewChild,
  //AfterContentInit,
  OnDestroy
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription} from 'rxjs';
import { first } from 'rxjs/operators';
import { PageService } from '@app/core/services/page.service';
// import { PageModel } from '@app/core';

@Component({
  selector: 'app-page-add',
  templateUrl: './page-add.component.html',
  styleUrls: ['./page-add.component.scss']
})
export class PageAddComponent implements OnInit, OnDestroy {

  pageForm: FormGroup;
  error: string;
  isLoading: boolean;
  submitted = false;
  returnUrl: string;
  watcher: Subscription;
  activeMediaQuery = '';
  @ViewChild('grid') grid: MatGridList;
  // Resize mat-grid-list column number based on screen size
  gridByBreakpoint = {
    xl: 3,
    lg: 3,
    md: 3,
    sm: 3,
    xs: 1
  }

  product_image1_url : string = "https://material.angular.io/assets/img/examples/shiba2.jpg";
  product_image2_url : string = "https://material.angular.io/assets/img/examples/shiba2.jpg";
  product_image3_url : string = "https://material.angular.io/assets/img/examples/shiba2.jpg";
  product_image4_url : string = "https://material.angular.io/assets/img/examples/shiba2.jpg";
  product_image5_url : string = "https://material.angular.io/assets/img/examples/shiba2.jpg";

  constructor(
    private mediaObserver: MediaObserver,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService
  ) {
    this.watcher = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      this.grid.cols = this.gridByBreakpoint[change.mqAlias];
    });
  }

  ngOnInit() {
    this.buildForm();
    this.returnUrl = 'pages';
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  get f () {
    return this.pageForm.controls;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      console.log(event);
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (_event) => { // called once readAsDataURL is completed
        event.target.name = reader.result;
      }
    }
  }

  // OnSubmit event
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.pageForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.pageService.addPage(this.pageForm.value)
      .pipe(first())
      .subscribe(
        data => {
          // console.log('successfull login, then return to ', this.returnUrl);
          this.router.navigate([this.returnUrl], {relativeTo: this.route});
      },
      error => {
        if (error instanceof HttpErrorResponse && error.status == 400) {
          if ("non_field_errors" in error.error) {
            let allErrors = error.error['non_field_errors'];
            this.error = allErrors[0];
          }
        }
        this.isLoading = false;
      });
  }

  buildForm() {
    this.pageForm = this.formBuilder.group({
      id: [],
      title: ['', [Validators.required]],
      slug: ['', []],
      status: [true, [Validators.required]],
      product_image1: ['']
    });
  }

  onCancelClicked() {
    this.router.navigate(['../../home'], {relativeTo: this.route});
  }
}

