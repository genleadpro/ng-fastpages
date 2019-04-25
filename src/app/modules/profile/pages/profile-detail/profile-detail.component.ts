import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '@app/core/services/user.service';
import { User } from '@app/core';


@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {

  me: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
    ) {

   }

  ngOnInit() {
    this.userService.me().subscribe(data => {
      this.me = data;
    })
  }

  onEditClicked() {
    this.router.navigate(['/profile/edit']);
  }

  onChangePasswordClicked() {
    this.router.navigate(['/profile/password' ]);
  }

}
