import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadesModeJocsService } from '../../services/dades-mode-jocs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mode-joc-create',
  standalone: false,
  templateUrl: './mode-joc-create.component.html',
  styleUrl: './mode-joc-create.component.css'
})
export class ModeJocCreateComponent implements OnInit{
  myForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private modejocService: DadesModeJocsService,
    private router: Router,
    private fb: FormBuilder,
  ) {
    this.myForm = this.fb.group({
      nom: ['', Validators.required],
      descripcio: ['', Validators.required],
      jugadors: ['', Validators.required],
    });
  }
  ngOnInit(): void {}
  onSubmit(): void {
    const formData = new FormData();
    formData.append('nom', this.myForm.get('nom')?.value);
    formData.append('descripcio', this.myForm.get('descripcio')?.value);
    formData.append('jugadors', this.myForm.get('jugadors')?.value);

    this.modejocService.createModeJoc(formData).subscribe({
      next: (response) => {
        console.log('Mode de joc creat:', response);
        this.router.navigate(['/mode-joc-list']);
      },
      error: (error) => {
        console.error('Error al crear el mode de joc:', error);
      }
    });
  }
}
