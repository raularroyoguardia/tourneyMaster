import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TokenService } from '../../services/auth/token.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLinkActive, RouterLink, CommonModule],
  templateUrl: './nav-bar.component.html',
  standalone: true,
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  user: any = {};
  isMenuOpen: boolean = false;
  isMobileMenuOpen: boolean = false;
  isParametersMenuOpen: boolean = false;
  usuariId: number = 0;
  equips: any[] = [];
  tipusUsuariId: number = 0;
  trofeus: number = 0;
  private trofeusInterval: any;
  canCreateTeam: boolean = true;
  apiBaseUrl: string = 'http://localhost:8000/api';
  BaseUrl: string = 'http://localhost:8000';

  constructor(
    private authService: AuthService,
    public tokenService: TokenService,
    private router: Router,
    private http: HttpClient
  ) { }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if(this.isMenuOpen) {
      this.isParametersMenuOpen = false;
    }
    console.log('Toggling menu:', this.isMenuOpen);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toogleParametersDropdown(): void {
    this.isParametersMenuOpen = !this.isParametersMenuOpen;
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
    this.tipusUsuariId = usuari.tipus_usuari_id;
    this.trofeus = usuari.trofeus || 0;
  
    this.getUserOne();
    this.getUserEquips();
  
    // Rutas que deben cerrar el menú
    const rutasQueCierranMenu = [
      '/torneig-new',
      '/equip-new',
      '/user-edit',
      '/user-list',
      '/joc-new',
      '/mode-joc-new',
      '/mapa-new',
      '/torneig-list',
      '/welcome',
      '/clasificacio-list',
      '/equip-list'
    ];
  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const rutaActual = event.urlAfterRedirects;
  
        if (rutasQueCierranMenu.includes(rutaActual)) {
          this.isMenuOpen = false;
          this.isMobileMenuOpen = false;
        }
      }
    });
  
    // Set up interval to refresh data
    this.trofeusInterval = setInterval(() => {
      this.getUserOne();
      this.getUserEquips();
    }, 1000);
  }

  public getUserOne() {
    this.http.get(`${this.apiBaseUrl}/userOne/${this.usuariId}`)
      .subscribe({
        next: (response: any) => {
          this.user = response;             
          this.trofeus = response.trofeus;
          // Update localStorage with the latest user data
          localStorage.setItem('user', JSON.stringify(this.user));
        },
        error: (error) => {
          console.error('Error al obtener el usuario:', error);
        }
      });
  }

  public getUserEquips() {
    this.http.get<any[]>(`${this.apiBaseUrl}/user/${this.usuariId}/equips`)
      .subscribe({
        next: (response: any[]) => {
          this.equips = response;
          // Si el usuario pertenece a algún equipo con maxim_integrants >= 2, NO puede crear otro
          this.canCreateTeam = !this.equips.some(equip => equip.maxim_integrants >= 2);
        },
        error: (error) => {
          console.error('Error al obtener equips del usuari:', error);
          this.canCreateTeam = true; // Fallback por si falla la petición
        }
      });
  }
  
  ngOnDestroy(): void {
    if (this.trofeusInterval) {
      clearInterval(this.trofeusInterval);
    }
  }
}