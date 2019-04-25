import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription} from 'rxjs';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {
  passwordForm: FormGroup;
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

  buildForm() {
    this.passwordForm = this.formBuilder.group({
      current_password: ['', [Validators.required]],
      new_password: ['', [Validators.minLength(5), Validators.maxLength(20)]],
      confirm_new_password: [true, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    });
  }
}
