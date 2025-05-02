import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DadesTornejosService } from '../../../services/dades-tornejos.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Mapa {
  id: number;
  nom: string;
  pivot: {
    mode_joc_id: number;
    mapa_id: number;
  };
}

interface ModeJoc {
  id: number;
  nom: string;
  descripcio: string;
  jugadors: number;
  created_at: string;
  updated_at: string;
  jocId: number;
  mapas: Mapa[];
}

interface Joc {
  id: number;
  nom: string;
  categoria: string;
  plataforma: string;
  foto: string;
  created_at: string;
  updated_at: string;
  mode_jocs: ModeJoc[];
}

@Component({
  selector: 'app-torneig-new',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './torneig-new.component.html',
  styleUrl: './torneig-new.component.css'
})
export class TorneigNewComponent implements OnInit {
  myForm: FormGroup;
  errorMessage: string = '';
  jocs: Joc[] = [];
  modesJoc: ModeJoc[] = [];
  mapas: Mapa[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dadesService: DadesTornejosService
  ) {
    this.myForm = this.fb.group({
      nom: ['', Validators.required],
      participants: [2, [Validators.required, Validators.min(2)]],
      tipus: ['', Validators.required],
      data_inici: ['', Validators.required],
      data_fi: ['', Validators.required],
      estat: ['', Validators.required],
      joc_id: ['', Validators.required],
      modeJoc_id: ['', Validators.required],
      mapa_id: ['', Validators.required],
      quantitat_partides: [{ value: 3, disabled: true }], // valor fijo
      numero_equips: [2, [Validators.required, Validators.min(2)]],
      premi_id: ['', Validators.required]

    });
    
  }

  ngOnInit(): void {
    this.dadesService.getJocs().subscribe({
      next: (data: Joc[]) => {
        this.jocs = data;
        console.log('Jocs carregats:', this.jocs);
      },
      error: (err) => {
        this.errorMessage = 'Error carregant els jocs.';
        console.error(err);
      }
    });
  
    this.myForm.get('joc_id')?.valueChanges.subscribe(jocId => {
      const jocSeleccionat = this.jocs.find(j => j.id === Number(jocId));
      if (jocSeleccionat) {
        this.modesJoc = jocSeleccionat.mode_jocs || [];
      } else {
        this.modesJoc = [];
      }
      this.mapas = [];
      this.myForm.patchValue({ modeJoc_id: '', mapa_id: '' });
    });
  
    this.myForm.get('modeJoc_id')?.valueChanges.subscribe(modeId => {
      const modeSeleccionat = this.modesJoc.find(m => m.id === Number(modeId));
      this.mapas = modeSeleccionat ? modeSeleccionat.mapas : [];
      this.myForm.patchValue({ mapa_id: '' });
    });
  } 

  onSubmit(): void {
    console.log(this.myForm.value); 
    const formData = new FormData();
    Object.entries(this.myForm.value).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.append('quantitat_partides', this.myForm.get('quantitat_partides')?.value);

    this.dadesService.createTorneig(formData).subscribe({
      next: () => this.router.navigate(['/torneig-list']),
      error: (err) => {
        this.errorMessage = 'Error en crear el torneig.';
      }
    });
  }
}