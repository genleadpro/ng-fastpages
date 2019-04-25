import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription} from 'rxjs';
import { UserService } from '@app/core/services/user.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  me: any;
  profileForm: FormGroup;
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
    this.userService.me().subscribe(data => {
      this.profileForm.patchValue(data);
      this.me = data;
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.userService.updateProfile(this.me.id, this.profileForm.value)
      .subscribe(data => {
        this.router.navigate(['..', { relative: this.route}]);
      })

  }

  onCancelClicked() {
    this.router.navigate(['..', {relative: this.route}]);
  }

  buildForm() {
    this.profileForm = this.formBuilder.group({
      id: [],
      email: [],
      first_name: [],
      last_name: [],
    });
  }
}
