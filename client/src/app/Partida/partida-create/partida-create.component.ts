import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadesPartidasService } from '../../services/dades-partidas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-partida-create',
  standalone: false,
  templateUrl: './partida-create.component.html',
  styleUrl: './partida-create.component.css'
})
export class PartidaCreateComponent implements OnInit {

  myForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private partidaService: DadesPartidasService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      data_hora: ['', Validators.required],
      posicio_partida: ['', Validators.required],
      // resultat_equip_id: ['', Validators.required],
      // torneig_id: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('data_hora', this.myForm.get('data_hora')?.value);
    formData.append('posicio_partida', this.myForm.get('posicio_partida')?.value);
    // formData.append('resultat_equip_id', this.myForm.get('resultat_equip_id')?.value);
    // formData.append('torneig_id', this.myForm.get('torneig_id')?.value);
    this.partidaService.createPartida(formData).subscribe({
      next: (response) => {
        console.log('Partida creada:', response);
        this.router.navigate(['/partida-list']);
      }
      ,
      error: (error) => {
        console.error('Error al crear la partida:', error);
        this.errorMessage = 'Error al crear la partida. Torna-ho a provar.';
      }
    });
  }
}
