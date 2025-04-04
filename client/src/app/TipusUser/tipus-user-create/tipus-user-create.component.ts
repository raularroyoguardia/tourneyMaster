import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DadesTipusUsersService } from '../../services/dades-tipus-users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tipus-user-create',
  standalone: false,
  templateUrl: './tipus-user-create.component.html',
  styleUrl: './tipus-user-create.component.css'
})
export class TipusUserCreateComponent implements OnInit {

  myForm: FormGroup;
//tipus	permisos
  constructor(
    private fb: FormBuilder,
    private tipusUserService: DadesTipusUsersService,
    private router: Router
  ) {
    this.myForm = this.fb.group({
      tipus: ['', Validators.required],
      permisos: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  onSubmit(): void {
    const formData = new FormData();
    formData.append('tipus', this.myForm.get('tipus')?.value);
    formData.append('permisos', this.myForm.get('permisos')?.value);
    this.tipusUserService.createTipusUser(formData).subscribe({
      next: (response) => {
        console.log('Tipus de Usuari creat correctament', response);
        this.router.navigate(['/tipus-user-list']);
      },
      error: (error) => {
        console.error('Error al crear el tipus de usuari', error);
      }
    });
  }
}
