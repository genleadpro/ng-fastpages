import { Component, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ThemeService } from '@app/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { AuthorizationService } from '@app/core/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss']
})
export class ContentLayoutComponent implements OnInit {
  private overlayContainer: OverlayContainer;
  theme = 'my-light-theme';
  isDarkTheme: Observable<boolean>;

  constructor(private themeService: ThemeService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private auth: AuthorizationService) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;

    if (this.overlayContainer) {
      this.overlayContainer.getContainerElement().classList.add(this.theme);
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );

  logout() {
    this.auth.logout();
    this.router.navigate(['/auth/login']);
  }

  onThemeChange(theme: boolean) {
    this.themeService.setDarkTheme(theme);
    this.theme = (theme) ? 'my-dark-theme' : 'my-light-theme';
    console.log(theme);
    if (this.overlayContainer) {
      const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
      const themeClassesToRemove = Array.from(overlayContainerClasses).filter((item: string) => item.includes('-theme'));
      if (themeClassesToRemove.length) {
        overlayContainerClasses.remove(...themeClassesToRemove);
      }
      overlayContainerClasses.add(this.theme);
    }
  }

}

