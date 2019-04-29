import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher} from '@angular/material';

import { HttpErrorResponse } from '@angular/common/http';
import { Subscription} from 'rxjs';
import { UserService } from '@app/core/services/user.service';
import { CustomValidators } from '@app/shared/validators/custom-validators';

/** Error when the parent is invalid */
class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control.dirty && form.invalid;
  }
}

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  passwordForm: FormGroup;
  errorMatcher = new CrossFieldErrorMatcher();
  error: string;
  isLoading: boolean;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.passwordForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.changePassword(
      this.passwordForm.get('current_password').value,
      this.passwordForm.get('new_password').value)
      .subscribe(data => {
        this.router.navigate(['..', { relative: this.route}]);
      })

  }

  onCancelClicked() {
    this.router.navigate(['..', {relative: this.route}]);
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('new_password');
    const confirmPassword = form.get('confirm_new_password');
    const condition = password.value !== confirmPassword.value;
    if (condition) {
      confirmPassword.setErrors({ passwordsDoNotMatch: true })
    }
    else {
      confirmPassword.setErrors(null)
    }

    return condition ? { passwordsDoNotMatch: true } : null;
  }

  buildForm() {
    this.passwordForm = this.formBuilder.group({
      current_password: ['', [Validators.required]],
      new_password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20)])],
      confirm_new_password: ''
    }, {
      validator: this.passwordMatchValidator   //CustomValidators.passwordMatch
    });
  }
}
