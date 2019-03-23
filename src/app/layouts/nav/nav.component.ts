import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment';
import { UserService } from '@app/core/services/user.service';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  version = environment.version;


  navItems = [
    { link: '/dashboard/home', title: 'Home' },
    { link: '/about', title: 'About' },
    { link: '/contact', title: 'Contact' }
  ];

  constructor(private userService: UserService) { }

  ngOnInit() {

  }

}
