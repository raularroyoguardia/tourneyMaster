import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITorneig } from '../../interfaces/iTorneig';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesTornejosService } from '../../services/dades-tornejos.service';

@Component({
  selector: 'app-torneig-edit',
  standalone: false,
  templateUrl: './torneig-edit.component.html',
  styleUrl: './torneig-edit.component.css'
})
export class TorneigEditComponent implements OnInit {
  myForm!: FormGroup;
  id!: string | null;
  tornejos: ITorneig[] = [];
  torneig: ITorneig | null | undefined;
  imageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private torneigService: DadesTornejosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nom: [null],
      tipus: [null],
      data_inici: [null],
      data_fi: [null],
      estat: [null],
      quantitat_partides: [null],
      numero_equips: [null]
    });
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.torneigService.getTorneig(this.id).subscribe({
      next: (data) => {
        this.myForm.setValue({
          nom: data.body ? data.body.nom : null,
          tipus: data.body ? data.body.tipus : null,
          data_inici: data.body ? data.body.data_inici : null,
          data_fi: data.body ? data.body.data_fi : null,
          estat: data.body ? data.body.estat : null,
          quantitat_partides: data.body ? data.body.quantitat_partides : null,
          numero_equips: data.body ? data.body.numero_equips : null
        });    
      },
      error: (error) => {
        console.error('Error obteniendo los datos del torneig:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.myForm.valid && this.id) {
      const formData = new FormData();
      formData.append('nom', this.myForm.get('nom')?.value);
      formData.append('tipus', this.myForm.get('tipus')?.value);
      formData.append('data_inici', this.myForm.get('data_inici')?.value);
      formData.append('data_fi', this.myForm.get('data_fi')?.value);
      formData.append('estat', this.myForm.get('estat')?.value);
      formData.append('quantitat_partides', this.myForm.get('quantitat_partides')?.value);
      formData.append('numero_equips', this.myForm.get('numero_equips')?.value);
      this.torneigService.updateTorneig(this.id, formData).subscribe({
        next: () => {
          console.log('Torneig updated successfully');
          this.router.navigate(['/torneig-list']);
        },
        error: (error) => {
          console.error('Error updating torneig:', error);
        }
      });
    }
  }
}
