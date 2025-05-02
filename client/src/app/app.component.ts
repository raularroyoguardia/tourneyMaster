import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, FooterComponent, CommonModule],
  providers: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true
})

export class AppComponent {
  showLayout: boolean = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Oculta nav y footer solo en /login
        // this.showLayout = !['/login'].includes(event.urlAfterRedirects);
        this.showLayout = !['/login', '/signup', '/404'].includes(event.urlAfterRedirects);
      });
  }
}
