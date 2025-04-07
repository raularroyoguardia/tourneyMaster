import { Component, OnInit } from '@angular/core';
import { IEquip } from '../../interfaces/iEquip';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesEquipsService } from '../../services/dades-equips.service';

@Component({
  selector: 'app-equip-edit',
  standalone: false,
  templateUrl: './equip-edit.component.html',
  styleUrl: './equip-edit.component.css'
})
export class EquipEditComponent implements OnInit {
  myForm!: FormGroup;
  id!: string | null;
  equips: IEquip[] = [];
  equip: IEquip | null | undefined;
  imageFile: File | null = null;


  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private directorService: DadesEquipsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      nom: [null],
      regio: [null],
      foto_equip: [null],
      trofeus: [null],
      data_creacio: [null],
      descripcio: [null],
      maxim_integrants: [null]

    });
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.directorService.getEquip(this.id).subscribe({
      next: (data) => {
        this.myForm.setValue({
          nom: data.body ? data.body.nom : null,
          edat: data.body ? data.body.regio : null,
          foto_equip: [null],
          trofeus: data.body ? data.body.trofeus : null,
          data_creacio: data.body ? data.body.data_creacio : null,
          descripcio: data.body ? data.body.descripcio : null,
          maxim_integrants: data.body ? data.body.maxim_integrants : null
        });
      },
      error: (error) => {
        console.error('Error obteniendo los datos del director:', error);
      }
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];  // Obtenemos el archivo
    if (file) {
      this.imageFile = file;  // Guardamos el archivo seleccionado
    }
  }


  onSubmit(): void {
    if (this.myForm.valid && this.id) {
      const formData = new FormData();
      formData.append('nom', this.myForm.get('nom')?.value);
      formData.append('regio', this.myForm.get('regio')?.value);
      formData.append('trofeus', this.myForm.get('trofeus')?.value);
      formData.append('data_creacio', this.myForm.get('data_creacio')?.value);
      formData.append('descripcio', this.myForm.get('descripcio')?.value);
      formData.append('maxim_integrants', this.myForm.get('maxim_integrants')?.value);
      if (this.imageFile) {
        formData.append('foto_equip', this.imageFile);
      }

      this.directorService.updateEquip(this.id, formData).subscribe({
        next: (data) => {
          console.log('Equip updated successfully:', data);
          this.router.navigate(['/equip-list']);
        },
        error: (error) => {
          console.error('Error editando el director:', error);
        }
      });
    }
  }
}
