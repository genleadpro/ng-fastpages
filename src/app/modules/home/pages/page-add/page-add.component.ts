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
import * as moment from 'moment';
import { PageService } from '@app/core/services/page.service';
import { environment as env } from '@env/environment';

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

  // OnSubmit event
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.pageForm.invalid) {
      return;
    }
    this.isLoading = true;

    let formData = new FormData();

    formData.append('title', this.pageForm.get('title').value);
    let slug = this.pageForm.get('slug').value.trim();

    if (slug) {
      formData.append('slug', slug);
    }
    formData.append('status', this.pageForm.get('status').value);
    formData.append('available_on', this.formatDate(this.pageForm.get('available_on').value));
    formData.append('available_off', this.formatDate(this.pageForm.get('available_off').value));

    this.pageService.addPage(formData)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['../' + data.id + '/edit'], { relativeTo: this.route });
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
      slug: '',
      status: [true, [Validators.required]],
      available_on: ['', [Validators.required]],
      available_off: ['', [Validators.required]],
    });
  }

  formatDate(dateStr: string) : string {
    let dt = moment(dateStr).format(env.serverDateFormat);
    return dt;
  }

  onCancelClicked() {
    this.router.navigate(['../../home'], {relativeTo: this.route});
  }
}

