import { Component, OnDestroy, OnInit } from '@angular/core';
import { IJoc } from '../interfaces/iJoc';
import { DadesJocsService } from '../services/dades-jocs.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  jocs: IJoc[] = [];
  currentIndex = 0;

  constructor(private jocService: DadesJocsService) {}

  ngOnInit(): void {
    this.jocService.getJocs().subscribe({
      next: (res: HttpResponse<IJoc[]>) => {
        this.jocs = res.body || [];
      },
      error: err => {
        console.error('Error al cargar los jocs:', err);
      }
    });
  }

  prev(): void {
    if (this.jocs.length === 0) return;
    this.currentIndex = (this.currentIndex - 1 + this.jocs.length) % this.jocs.length;
  }

  next(): void {
    if (this.jocs.length === 0) return;
    this.currentIndex = (this.currentIndex + 1) % this.jocs.length;
  }
}


