import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '@app/core/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthorizationService
    ) {}

  ngOnInit() {
  }


  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

}

