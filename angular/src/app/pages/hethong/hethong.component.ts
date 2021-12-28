import { Component, OnInit } from '@angular/core';
import { AuthService } from '@abp/ng.core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-hethong',
  templateUrl: './hethong.component.html',
  styleUrls: ['./hethong.component.css']
})
export class HethongComponent implements OnInit {
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

}
