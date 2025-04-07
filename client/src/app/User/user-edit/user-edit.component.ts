import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IUser } from '../../interfaces/iUser';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesUsersService } from '../../services/dades-users.service';

@Component({
  selector: 'app-user-edit',
  standalone: false,
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  myForm!: FormGroup;
  id!: string | null;
  users: IUser[] = [];
  user: IUser | null | undefined;
  imageFile: File | null = null;
  
  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private userService: DadesUsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: [null],
      edat: [null],
      foto_perfil: [null],
      trofeus: [null],
      data_registre: [null]
    });
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.userService.getUser(this.id).subscribe({
      next: (data) => {
        this.myForm.setValue({
          name: data.body ? data.body.name : null,
          email: data.body ? data.body.email : null,
          telefon: data.body ? data.body.telefon : null,
          data_naixement: data.body ? data.body.data_naixement : null,
          foto_perfil: [null],
          trofeus: data.body ? data.body.trofeus : null,
          data_registre: data.body ? data.body.data_registre : null,
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
      this.imageFile = file; // Guardamos el archivo en la variable imageFile
    }
  }
  onSubmit(): void {
    if (this.myForm.valid && this.id) {
      const formData = new FormData();
      formData.append('name', this.myForm.get('name')?.value);
      formData.append('email', this.myForm.get('email')?.value);
      formData.append('telefon', this.myForm.get('telefon')?.value);
      formData.append('data_naixement', this.myForm.get('data_naixement')?.value);
      if (this.imageFile) {
        formData.append('foto_perfil', this.imageFile);
      }
      formData.append('trofeus', this.myForm.get('trofeus')?.value);
      formData.append('data_registre', this.myForm.get('data_registre')?.value);

      this.userService.updateUser(this.id, formData).subscribe({
        next: () => {
          console.log('User updated successfully');
          this.router.navigate(['/user-list']);
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    }
  }
}

