import { Component, OnInit, Inject, AfterViewInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { IJoc } from '../../interfaces/iJoc';
import { DadesJocsService } from '../../services/dades-jocs.service';
import { CarouselModule } from 'primeng/carousel';
import { Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    CarouselModule,
    ToastModule
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})

export class WelcomeComponent implements OnInit {
  jocs: IJoc[] = [];
  activeIndex: number = -1;

  constructor(
    private jocService: DadesJocsService,
    private router: Router,
    private toastService: ToastService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const nav = this.router.getCurrentNavigation();
    const toast = nav?.extras.state?.['toast'];
    if (toast) {
      this.toastService.showSuccess(toast.summary, toast.detail);
    }
  }

  ngOnInit(): void {
    this.jocService.getJocs().subscribe({
      next: (res) => {
        this.jocs = res.body || [];
      },
      error: err => {
        console.error('Error al cargar los jocs:', err);
      }
    });
  }

  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }
}
