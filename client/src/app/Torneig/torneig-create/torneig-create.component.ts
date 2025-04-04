import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadesTornejosService } from '../../services/dades-tornejos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-torneig-create',
  standalone: false,
  templateUrl: './torneig-create.component.html',
  styleUrl: './torneig-create.component.css'
})
export class TorneigCreateComponent implements OnInit{

  myForm: FormGroup;
  selectedFile: File | null = null; // Per guardar el fitxer seleccionat
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private torneigService: DadesTornejosService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      nom: ['', Validators.required],
      participants: ['', Validators.required],
      tipus: ['', Validators.required],
      data_inici: ['', Validators.required],
      data_fi: ['', Validators.required],
      estat: ['', Validators.required],
      quantitat_partides: ['', Validators.required],
      numero_equips: ['', Validators.required],
      modeJoc_id: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  onSubmit(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Has de seleccionar un fitxer.';
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.myForm.get('nom')?.value);
    formData.append('participants', this.myForm.get('participants')?.value);
    formData.append('tipus', this.myForm.get('tipus')?.value);
    formData.append('data_inici', this.myForm.get('data_inici')?.value);
    formData.append('data_fi', this.myForm.get('data_fi')?.value);
    formData.append('estat', this.myForm.get('estat')?.value);
    formData.append('quantitat_partides', this.myForm.get('quantitat_partides')?.value);
    formData.append('numero_equips', this.myForm.get('numero_equips')?.value);
    formData.append('modeJoc_id', this.myForm.get('modeJoc_id')?.value);
    this.torneigService.createTorneig(formData).subscribe({
      next: (response) => {
        console.log('Torneig creat correctament', response);
        this.router.navigate(['/torneig-list']);
      },
      error: (error) => {
        console.error('Error al crear el torneig', error);
      }
    });
  }

}
