import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPartida } from '../../interfaces/iPartida';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesPartidasService } from '../../services/dades-partidas.service';

@Component({
  selector: 'app-partida-edit',
  standalone: false,
  templateUrl: './partida-edit.component.html',
  styleUrl: './partida-edit.component.css'
})
export class PartidaEditComponent {

  myForm!: FormGroup;
  id!: string | null;
  partidas: IPartida[] = [];
  partida: IPartida | null | undefined;
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private partidaService: DadesPartidasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      data_hora: [null],
      posicio_partida: [null]
    });
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.partidaService.getPartida(this.id).subscribe({
      next: (data) => {
        this.myForm.setValue({
          data_hora: data.body ? data.body.data_hora : null,
          posicio_partida: data.body ? data.body.posicio_partida : null
        });
      },
      error: (error) => {
        console.error('Error obteniendo los datos del director:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.myForm.valid && this.id) {
      const formData = new FormData();
      formData.append('data_hora', this.myForm.get('data_hora')?.value);
      formData.append('posicio_partida', this.myForm.get('posicio_partida')?.value);

      this.partidaService.updatePartida(this.id, formData).subscribe({
        next: () => {
          console.log('Partida updated successfully');
          this.router.navigate(['/partidas-list']);
        },
        error: (error) => {
          console.error('Error updating partida:', error);
        }
      });
    }
  }
}
