import { Component, OnDestroy, OnInit } from '@angular/core';
import { IJoc } from '../interfaces/iJoc';
import { DadesJocsService } from '../services/dades-jocs.service';
import { HttpClient, HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-welcome',
  standalone: false,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'] 
})
export class WelcomeComponent implements OnInit {
  // jocs: IJoc[] = [];
  currentIndex = 0;


  jocs: string[] = [];
  constructor(private http: HttpClient) {}

  

  // constructor(private jocService: DadesJocsService) {}

  // ngOnInit(): void {
  //   this.jocService.getJocs().subscribe({
  //     next: (res: HttpResponse<IJoc[]>) => {
  //       this.jocs = res.body || [];
  //     },
  //     error: err => {
  //       console.error('Error al cargar los jocs:', err);
  //     }
  //   });
  // }
  ngOnInit() {
    this.http.get<string[]>('http://localhost:8000/images')
      .subscribe((data: string[]) => {
        this.jocs = data;
      });
  }
}


