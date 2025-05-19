import { Component, OnInit } from '@angular/core';
import { IJoc } from '../../../interfaces/iJoc';
import { DadesJocsService } from '../../../services/dades-jocs.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-joc-new',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './joc-new.component.html',
  styleUrl: './joc-new.component.css'
})
export class JocNewComponent implements OnInit {
  jocs: IJoc[] = [];
  form: FormGroup;
  errorMessage = '';
  selectedImage: File | null = null;
  previewImageUrl: string | null = null;

  constructor(
    private jocService: DadesJocsService,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
  ) {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      categoria: ['', Validators.required],
      plataforma: ['', Validators.required],
      foto: ['', Validators.required],
    });
   }

  ngOnInit(): void {
   setInterval(() => {
    this.jocService.getJocs().subscribe({
      next: (res) => {
        if(res.body) {
          this.jocs = res.body;
        }
      },
      error: (err) => {
        console.log("Error en obtenir els jocs.", err);
      }
    });
   }, 1000);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
      this.form.get('foto')?.setValue(this.selectedImage);
    }
  }

  onSubmit(): void {
    if(this.form.invalid || !this.selectedImage) {
      this.errorMessage = 'Omple tots els camps correctament';
      return;
    }

    const formData = new FormData();
    
    formData.append('nom', this.form.get('nom')?.value);
    formData.append('categoria', this.form.get('categoria')?.value);
    formData.append('plataforma', this.form.get('plataforma')?.value);
    formData.append('foto', this.selectedImage);

    this.jocService.createJoc(formData).subscribe({
      next: () => {
        this.router.navigate(['/joc-new']);
        this.ngOnInit();
        this.form = this.fb.group({
          nom: ['', Validators.required],
          categoria: ['', Validators.required],
          plataforma: ['', Validators.required],
          foto: ['', Validators.required],
        });
      },
      error: (err) => {
        this.errorMessage = 'Error en crear el joc';
        console.log(err);
      }
    })
  }

  eliminar(id: any): void {
    this.jocService.deleteJoc(id).subscribe({
      next: () => {
        alert("Joc eliminat correctament!");
        this.ngOnInit();
      },
      error: (error) => {
        alert("No s\'hapogut eliminar el joc!\n" + error.message);
      }
    })
  }
}
