import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadesEquipsService } from '../../services/dades-equips.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equip-create',
  standalone: false,
  templateUrl: './equip-create.component.html',
  styleUrl: './equip-create.component.css'
})
export class EquipCreateComponent implements OnInit {

  //nom	regio	foto_equip	trofeus	data_creacio	descripcio	maxim_integrants
  myForm: FormGroup;
  selectedFile: File | null = null;
  errorMessage: string = '';

  constructor(
    private equipService: DadesEquipsService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.myForm = this.fb.group({
      nom: ['', Validators.required],
      regio: ['', Validators.required],
      foto_equip: [null],
      trofeus: ['', Validators.required],
      data_creacio: ['', Validators.required],
      descripcio: ['', Validators.required],
      maxim_integrants: ['', Validators.required],

    });
  }
  ngOnInit(): void {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; // Guardem el fitxer seleccionat
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      this.errorMessage = 'Has de seleccionar un fitxer.';
      return;
    }

    const formData = new FormData();
    formData.append('nom', this.myForm.get('nom')?.value);
    formData.append('regio', this.myForm.get('regio')?.value);
    formData.append('foto_equip', this.selectedFile);
    formData.append('trofeus', this.myForm.get('trofeus')?.value);
    formData.append('data_creacio', this.myForm.get('data_creacio')?.value);
    formData.append('descripcio', this.myForm.get('descripcio')?.value);
    formData.append('maxim_integrants', this.myForm.get('maxim_integrants')?.value);

    this.equipService.createEquip(formData).subscribe({
      next: (response) => {
        console.log('Equip creat:', response);
        this.router.navigate(['/equip-list']);
      },
      error: (error) => {
        this.errorMessage = error.message || 'Error en crear el nou director.';
      }
    });
  }
}
