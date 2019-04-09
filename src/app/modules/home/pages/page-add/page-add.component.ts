import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { MatGridList } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription} from 'rxjs';
import { first } from 'rxjs/operators';
import { findIndex as _findIndex } from 'lodash';

import { PageService } from '@app/core/services/page.service';
// import { isString } from 'util';
// import { SpinnerComponent } from '@app/shared/components/spinner/spinner.component';

export class acceptedFile {
  name: string;
  file: File;
  constructor (name: string, file: File) {
    this.name = name;
    this.file = file;
  }
}

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
    xl: 4,
    lg: 4,
    md: 4,
    sm: 3,
    xs: 1
  }

  acceptedFiles = [];
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
    this.returnUrl = '../../home';
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  get f () {
    return this.pageForm.controls;
  }

  // Done: TEST
  onFileAccepted(event, key) {
    let aFile = new acceptedFile(key, event);
    this.acceptedFiles.push(aFile);
  }

  // Done: TEST
  onFileDeleted(event, key) {
    const index : number = _findIndex(this.acceptedFiles, function(item) {
      return item.name == key;
    });
    if (index !== -1) this.acceptedFiles.splice(index, 1);
  }

  // OnSubmit event
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.pageForm.invalid) {
      return;
    }
    this.isLoading = true;
    let formData = new FormData();
    let data = this.pageForm.value;


    this.acceptedFiles.forEach(obj => {
      formData.append(obj.name, obj.file.file, obj.file.name);
    });

    formData.append('title', this.pageForm.get('title').value);
    formData.append('slug', this.pageForm.get('slug').value);
    formData.append('status', this.pageForm.get('status').value);
    this.pageService.addPage(formData)
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
      title: ['', [Validators.required, Validators.maxLength(200)]],
      slug: ['', [Validators.minLength(5), Validators.maxLength(10)]],
      status: [true, [Validators.required]],
      available_on: [],
      available_off: [],
      product_name: ['', [Validators.required, Validators.maxLength(100)]],
      product_description: [''],
      product_price: [],
      product_discount_price: [],
      product_discount_until: [],
      product_image1: [],
      product_image2: [],
      product_image3: [],
      product_image4: [],
      product_image5: [],
      product_image6: []
    });
  }

  onCancelClicked() {
    this.router.navigate(['../../home'], {relativeTo: this.route});
  }
}

