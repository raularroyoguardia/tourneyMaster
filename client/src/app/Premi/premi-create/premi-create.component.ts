import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadesPremisService } from '../../services/dades-premis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-premi-create',
  standalone: false,
  templateUrl: './premi-create.component.html',
  styleUrl: './premi-create.component.css'
})
export class PremiCreateComponent implements OnInit{
  myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private premiService: DadesPremisService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      posicio_premi: ['', Validators.required],
      valor: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formData = new FormData();
    formData.append('posicio_premi', this.myForm.get('posicio_premi')?.value);
    formData.append('valor', this.myForm.get('valor')?.value);
    this.premiService.createPremi(formData).subscribe({
      next: (response) => {
        console.log('Premi creat correctament', response);
        this.router.navigate(['/premi-list']);
      }
      ,
      error: (error) => {
        console.error('Error al crear el premi', error);
      }
    });
  }

}
