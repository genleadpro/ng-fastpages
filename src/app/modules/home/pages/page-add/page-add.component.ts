import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { PageService } from '@app/core/services/page.service';
import { PageModel } from '@app/core';

@Component({
  selector: 'app-page-add',
  templateUrl: './page-add.component.html',
  styleUrls: ['./page-add.component.scss']
})
export class PageAddComponent implements OnInit {

  pageForm: FormGroup;
  error: string;
  isLoading: boolean;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.returnUrl = 'pages';
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
      status: [true, [Validators.required]]
    });
  }

  onCancelClicked() {
    this.router.navigate(['../../home'], {relativeTo: this.route});
  }
}

