import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env/environment';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
    public pushRightClass: string;
    public APP_TITLE = environment.appTitle;
    public production = environment.envName === 'PROD';
    public myTenant : string;
    constructor(public router: Router, private translate: TranslateService) {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        this.myTenant = localStorage.getItem('tenant_name');
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
        console.log(this.pushRightClass);
    }

    onLoggedout() {
        this.router.navigate(['/auth/login']);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    onProfileMenuClicked() {
      this.router.navigate(['/profile']);
    }

    onSettingMenuClicked() {
      this.router.navigate(['/settings']);
    }

}
