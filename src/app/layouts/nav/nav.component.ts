import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { UserService } from '@app/core/services/user.service';
import { AuthenticationService} from '@app/core/services/authentication.service';
import { User } from '@app/core/models/user.model';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  version = environment.version;
  user : User;
  navItems = [
    { link: '/dashboard/home', title: 'Home' },
    { link: '/about', title: 'About' },
    { link: '/contact', title: 'Contact' }
  ];

  constructor(private userService: UserService, private auth: AuthenticationService) { }

  ngOnInit() {
    if (this.auth.isAuthenticated()) {
      this.userService.me().subscribe(data=> {
        this.user = data;
        console.log(data);
      })
    }

  }

}
