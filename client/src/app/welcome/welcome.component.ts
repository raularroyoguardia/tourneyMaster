import { Component, OnInit } from '@angular/core';
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

  constructor(private jocService: DadesJocsService) {}

  ngOnInit(): void {
    this.jocService.getJocs().subscribe((res: HttpResponse<IJoc[]>) => {
      this.jocs = res.body || [];
    });
  }
}
