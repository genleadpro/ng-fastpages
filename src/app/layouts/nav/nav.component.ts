import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { UserService } from '@app/core/services/user.service';
import { AuthorizationService} from '@app/core/services/authorization.service';
import { User } from '@app/core/models/user.model';
import { ThemePicker } from './../../shared/theme-picker/theme-picker';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  version = environment.version;
  user$ : User;
  navItems = [
    { link: '/dashboard/home', title: 'Home' },
    { link: '/about', title: 'About' },
    { link: '/contact', title: 'Contact' }
  ];

  constructor(private userService: UserService, private auth: AuthorizationService) { }

  ngOnInit() {
    if (this.auth.isAuthenticated() && !this.user$) {
      this.userService.me().subscribe((data: User)=> {
        this.user$ = data;
        console.log(data);
      })
    }

  }

  logout() {
    this.auth.logout();

  }


}
