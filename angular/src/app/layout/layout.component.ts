import { Component, OnInit } from '@angular/core';
import { AuthService } from '@abp/ng.core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  get hasLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }
  constructor(private oAuthService: OAuthService,
              private authService: AuthService) { }

  ngOnInit(): void {
    if (!this.hasLoggedIn) {
      this.authService.navigateToLogin();
    }
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      sessionStorage.clear();
      localStorage.clear();
      // this.store.dispatch(
      //   new Navigate(['/'], null, {
      //     state: { redirectUrl: this.store.selectSnapshot(RouterState)?.state.url },
      //   })
      // );
    });
  }

  login() {
    this.authService.navigateToLogin();
  }
}
