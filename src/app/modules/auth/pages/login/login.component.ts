import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { tap, delay, finalize, catchError, subscribeOn } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '@app/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  error: string;
  isLoading: boolean;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService
  ) {

  }

  ngOnInit() {
    this.buildForm();

    // reset login status
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard/home';
  };


  get f () {
    return this.loginForm.controls;
  }

  // OnSubmit event
  login() {
    this.isLoading = true;

    this.authService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
      },
      error => {
        this.error = error;
        if (error instanceof HttpErrorResponse) {
          const errorMessages = new Array<{ propName: string; errors: string }>();

          if (error.status === 400) {
            // TODO: extract errors here and match onto the form
          }
        }
        this.isLoading = false;
      });
  }

  private buildForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
