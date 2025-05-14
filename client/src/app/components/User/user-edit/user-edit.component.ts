import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DadesUsersService } from '../../../services/dades-users.service';
import { TokenService } from '../../../services/auth/token.service';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  id: string | null | undefined;
  myForm: FormGroup;
  selectedFile: File | null = null;
  imagenActualUrl: string | null = null;
  previewImageUrl: string | null = null;

  constructor(
    private tokenService: TokenService,
    private userService: DadesUsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.myForm = new FormGroup({
    });
  }

  ngOnInit(): void {
    this.id = this.tokenService.getUserId();

    this.myForm = this.formBuilder.group({
      id: [{ value: this.id, disabled: true }],
      name: [null],
      apellido1: [null],
      apellido2: [null],
      email: [null],
      telefon: [null],
      foto_perfil: [null],
    });

    this.userService.getOneUser(this.id).subscribe({
      next: (data) => {
        if (data.body) {
          console.log(data.body);
          this.myForm.patchValue(data.body);
          this.imagenActualUrl = `http://127.0.0.1:8000/uploads/fotoUsuari/${data.body.foto_perfil}`;
          this.imagenActualUrl = data.body.foto_perfil;
        } else {
          alert("No s'han trobat dades del usuari");
        }
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('name', this.myForm.get('name')?.value);
    formData.append('apellido1', this.myForm.get('apellido1')?.value);
    formData.append('apellido2', this.myForm.get('apellido2')?.value);
    formData.append('email', this.myForm.get('email')?.value);
    formData.append('telefon', this.myForm.get('telefon')?.value);

    if (this.selectedFile) {
      formData.append('foto_perfil', this.selectedFile, this.selectedFile.name);
    } else if (this.imagenActualUrl) {
      formData.append('foto_perfil', this.imagenActualUrl);
    }

    this.userService.updateUser(this.id, formData).subscribe({
      next: () => {
        alert("Usuari actualitzar correctament");
        this.router.navigate(['/welcome']);
      },
      error: (error) => {
        alert("No s'ha pogut actualitzar el teu usuari\n" + error.message);
      }
    })
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      // Mostrar vista previa
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}