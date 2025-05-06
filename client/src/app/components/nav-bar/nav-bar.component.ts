import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TokenService } from '../../services/auth/token.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  standalone: true,
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  user: any = {};

  constructor(
    private authService: AuthService,
    public tokenService: TokenService,
    private router: Router
  ) { }

  logout(): void {
    this.authService.logout().subscribe(
      response => this.handleResponse(response),
      errors => this.handleErrors(errors)
    );
  }

  private handleResponse(response: any): void {
    console.log(response.message);
    this.tokenService.revokeToken();
    this.router.navigateByUrl('/welcome');
  }

  private handleErrors(errors: any): void {
    console.log(errors.error);
  }

  ngOnInit() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }


}
