import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IJoc } from '../interfaces/iJoc';
import { DadesJocsService } from '../services/dades-jocs.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
declare var bootstrap: any;

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'] 
})
export class WelcomeComponent implements OnInit, AfterViewInit {
  jocs: IJoc[] = [];
  activeIndex: number = -1; // Para controlar qué acordeón está abierto

  constructor(private jocService: DadesJocsService) {}

  ngOnInit(): void {
    this.jocService.getJocs().subscribe({
      next: (res) => {
        this.jocs = res.body || [];
        setTimeout(() => this.initCarousel(), 0.1);
      },
      error: err => {
        console.error('Error al cargar los jocs:', err);
      }
    });
  }
  
  ngAfterViewInit() {
    this.initCarousel();
  }

  initCarousel() {
    const el = document.querySelector('#carouselExample');
    if (el) {
      bootstrap.Carousel.getOrCreateInstance(el);
    }
  }

  // Método para controlar el acordeón
  toggleAccordion(index: number) {
    this.activeIndex = this.activeIndex === index ? -1 : index;
  }
}