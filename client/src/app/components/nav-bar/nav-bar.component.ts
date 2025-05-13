import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TokenService } from '../../services/auth/token.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  standalone: true,
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  user: any = {};
  equip: any = {};
  isMenuOpen: boolean = false;
  usuariId: number = 0;
  trofeus: number = this.user.trofeus;
  private trofeusInterval: any;

  constructor(
    private authService: AuthService,
    public tokenService: TokenService,
    private router: Router,
    private http: HttpClient
  ) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Toggling menu:', this.isMenuOpen);
  }
  
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

    const usuari = JSON.parse(localStorage.getItem('user') || '{}');
    this.usuariId = usuari.id;
    const Equip = this.equip = JSON.parse(localStorage.getItem('equip') || '{}');
    this.getUserOne();

    this.trofeusInterval = setInterval(() => {
      this.getUserOne();
    }, 1000);
  }

  public getUserOne() {
    this.http.get(`http://localhost:8000/api/userOne/${this.usuariId}`)
      .subscribe({
        next: (response: any) => {
          this.user = response;             
          this.trofeus = response.trofeus;
        },
        error: (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.trofeusInterval) {
      clearInterval(this.trofeusInterval);
    }
  }
  

}
