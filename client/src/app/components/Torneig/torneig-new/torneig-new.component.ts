import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
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
// export class TorneigNewComponent implements OnInit {
//   myForm: FormGroup;
//   errorMessage: string = '';
//   jocs: Joc[] = [];
//   modesJoc: ModeJoc[] = [];
//   mapas: Mapa[] = [];

//   constructor(
//     private fb: FormBuilder,
//     private router: Router,
//     private dadesService: DadesTornejosService
//   ) {
//     this.myForm = this.fb.group({
//       nom: ['', Validators.required],
//       participants: [2, [Validators.required, Validators.min(2)]],
//       tipus: ['', Validators.required],
//       data_inici: ['', Validators.required],
//       data_fi: ['', Validators.required],
//       estat: ['', Validators.required],
//       joc_id: ['', Validators.required],
//       modeJoc_id: ['', Validators.required],
//       mapa_id: ['', Validators.required],
//       quantitat_partides: [{ value: 3, disabled: true }], // valor fijo
//       numero_equips: [2, [Validators.required, Validators.min(2)]],
//       premi_id: ['', Validators.required]

//     }, { validators: this.dataFiPosteriorValidator() });
    
//   }

//   dataFiPosteriorValidator(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any } | null => {
//       const dataInici = control.get('data_inici')?.value;
//       const dataFi = control.get('data_fi')?.value;
  
//       if (dataInici && dataFi && new Date(dataFi) < new Date(dataInici)) {
//         return { dataFiAnterior: true };
//       }
//       return null;
//     };
//   }

//   ngOnInit(): void {
//     this.dadesService.getJocs().subscribe({
//       next: (data: Joc[]) => {
//         this.jocs = data;
//         console.log('Jocs carregats:', this.jocs);
//       },
//       error: (err) => {
//         this.errorMessage = 'Error carregant els jocs.';
//         console.error(err);
//       }
//     });
  
//     this.myForm.get('joc_id')?.valueChanges.subscribe(jocId => {
//       const jocSeleccionat = this.jocs.find(j => j.id === Number(jocId));
//       if (jocSeleccionat) {
//         this.modesJoc = jocSeleccionat.mode_jocs || [];
//       } else {
//         this.modesJoc = [];
//       }
//       this.mapas = [];
//       this.myForm.patchValue({ modeJoc_id: '', mapa_id: '' });
//     });
  
//     this.myForm.get('modeJoc_id')?.valueChanges.subscribe(modeId => {
//       const modeSeleccionat = this.modesJoc.find(m => m.id === Number(modeId));
//       this.mapas = modeSeleccionat ? modeSeleccionat.mapas : [];
//       this.myForm.patchValue({ mapa_id: '' });
//     });
//   } 

//   onSubmit(): void {
//     console.log(this.myForm.value); 
//     const formData = new FormData();
//     Object.entries(this.myForm.value).forEach(([key, value]) => {
//       formData.append(key, String(value));
//     });
//     formData.append('quantitat_partides', this.myForm.get('quantitat_partides')?.value);

//     this.dadesService.createTorneig(formData).subscribe({
//       next: () => this.router.navigate(['/torneig-list']),
//       error: (err) => {
//         this.errorMessage = 'Error en crear el torneig.';
//       }
//     });
//   }
// }
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
      quantitat_partides: [{ value: 3, disabled: true }],
      numero_equips: [2, [Validators.required, Validators.min(2)]],
      premi_id: ['', Validators.required],
      partides: this.fb.array([])
    }, { validators: this.dataValidator() });

    this.generarPartides();
  }

  ngOnInit(): void {
    this.dadesService.getJocs().subscribe({
      next: (data: Joc[]) => this.jocs = data,
      error: (err) => {
        this.errorMessage = 'Error carregant els jocs.';
        console.error(err);
      }
    });

    this.myForm.get('joc_id')?.valueChanges.subscribe(jocId => {
      const jocSeleccionat = this.jocs.find(j => j.id === Number(jocId));
      this.modesJoc = jocSeleccionat?.mode_jocs || [];
      this.mapas = [];
      this.myForm.patchValue({ modeJoc_id: '', mapa_id: '' });
    });

    this.myForm.get('modeJoc_id')?.valueChanges.subscribe(modeId => {
      const modeSeleccionat = this.modesJoc.find(m => m.id === Number(modeId));
      this.mapas = modeSeleccionat?.mapas || [];
      this.myForm.patchValue({ mapa_id: '' });
    });
  }

  get partides(): FormArray {
    return this.myForm.get('partides') as FormArray;
  }

  generarPartides(): void {
    const quantitat = 3;
    this.partides.clear();
  
    for (let i = 0; i < quantitat; i++) {
      this.partides.push(this.fb.group({
        hora: ['', [
          Validators.required,
          this.horaPartidaValida(
            () => this.myForm.get('data_inici')?.value,
            () => this.myForm.get('data_fi')?.value
          )
        ]]
      }));
    }
  
    // Revalidar si cambian las fechas
    this.myForm.get('data_inici')?.valueChanges.subscribe(() => {
      this.revalidarPartides();
    });
    this.myForm.get('data_fi')?.valueChanges.subscribe(() => {
      this.revalidarPartides();
    });
  }
  
  horaPartidaValida(dataInici: () => string, dataFi: () => string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const hora = control.value;
      const inici = new Date(dataInici());
      const fi = new Date(dataFi());
      const horaDate = new Date(hora);
  
      if (hora && (horaDate < inici || horaDate > fi)) {
        return { foraDeRang: true };
      }
      return null;
    };
  }

  revalidarPartides(): void {
    this.partides.controls.forEach(control => {
      control.get('hora')?.updateValueAndValidity();
    });
  }
  
  dataValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      const dataInici = group.get('data_inici')?.value;
      const dataFi = group.get('data_fi')?.value;
      const partides = (group.get('partides') as FormArray).controls;

      const errors: any = {};

      if (dataInici && dataFi && new Date(dataFi) < new Date(dataInici)) {
        errors.dataFiAnterior = true;
      }

      if (dataInici && dataFi && partides.length > 0) {
        const start = new Date(dataInici);
        const end = new Date(dataFi);

        for (let i = 0; i < partides.length; i++) {
          const hora = partides[i].get('hora')?.value;
          if (hora) {
            const horaDate = new Date(hora);
            if (horaDate < start || horaDate > end) {
              errors.partidesForaDeRang = true;
              break;
            }
          }
        }

        const hores = partides.map(p => new Date(p.get('hora')?.value || ''));
        if (hores.every(h => h instanceof Date && !isNaN(h.getTime()))) {
          if (!(hores[0] <= hores[1] && hores[1] <= hores[2])) {
            errors.ordrePartidesIncorrecte = true;
          }
        }
      }

      return Object.keys(errors).length ? errors : null;
    };
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.errorMessage = 'Revisa els camps del formulari.';
      return;
    }

    const formData = new FormData();
    Object.entries(this.myForm.value).forEach(([key, value]) => {
      if (key !== 'partides') {
        formData.append(key, String(value));
      }
    });

    this.partides.controls.forEach((partidaControl, index) => {
      const hora = partidaControl.get('hora')?.value;
      formData.append(`partides[${index}][hora]`, hora);
    });

    formData.append('quantitat_partides', '3');

    this.dadesService.createTorneig(formData).subscribe({
      next: () => this.router.navigate(['/torneig-list']),
      error: (err) => {
        this.errorMessage = 'Error en crear el torneig.';
        console.error(err);
      }
    });
  }
}
