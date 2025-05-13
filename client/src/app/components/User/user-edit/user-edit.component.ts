import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesUsersService } from '../../../services/dades-users.service';

@Component({
  selector: 'app-user-edit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.css'
})
export class UserEditComponent implements OnInit {
  id: string | null | undefined;
  myForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private userService: DadesUsersService,
    private router: Router,
  ) {
    this.myForm = new FormGroup({
    });
  }


  ngOnInit(): void {
    this.id = this.ruta.snapshot.paramMap.get('id');

    this.myForm = this.fb.group({
      id: [{ value: this.id, disabled: true }],
      name: [null],
      apellido1: [null],
      apellido2: [null],
      email: [null],
      password: [null],
      telefon: [null],
      foto_perfil: [null],
      trofeus: [null],
    });

    this.userService.getUser(this.id).subscribe({
      next: (data) => {
        if (data.body) {
          this.myForm.setValue({
            id: data.body?.id,
            name: data.body?.name,
            apellido1: data.body?.apellido1,
            apellido2: data.body?.apellido2,
            email: data.body?.email,
            password: data.body?.password,
            telefon: data.body?.telefon,
            foto_perfil: data.body?.foto_perfil,
            trofeus: data.body?.trofeus,
          });
        }else {
          alert('No s\'han trobat dades del usuari');
        }
      },
      error: (error) => {
        alert(error.message);
      }
    });
  }
}