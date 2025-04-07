import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ITipusUser } from '../../interfaces/iTipusUser';
import { ActivatedRoute, Router } from '@angular/router';
import { DadesTipusUsersService } from '../../services/dades-tipus-users.service';

@Component({
  selector: 'app-tipus-user-edit',
  standalone: false,
  templateUrl: './tipus-user-edit.component.html',
  styleUrl: './tipus-user-edit.component.css'
})
export class TipusUserEditComponent implements OnInit{
  myForm!: FormGroup;
  id!: string | null;
  tipusUsers: ITipusUser[] = [];
  tipusUser: ITipusUser | null | undefined;
  imageFile: File | null = null;


  constructor(
    private fb: FormBuilder,
    private ruta: ActivatedRoute,
    private tipusUserService: DadesTipusUsersService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      tipus: [null],
      permisos: [null]
    });
    this.id = this.ruta.snapshot.paramMap.get('id');
    this.tipusUserService.getTipusUser(this.id).subscribe({
      next: (data) => {
        this.myForm.setValue({
          tipus: data.body ? data.body.tipus : null,
          permisos: data.body ? data.body.permisos : null
        });
      },
      error: (error) => {
        console.error('Error obteniendo los datos del director:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.myForm.valid && this.id) {
      const formData = new FormData();
      formData.append('tipus', this.myForm.get('tipus')?.value);
      formData.append('permisos', this.myForm.get('permisos')?.value);

      this.tipusUserService.updateTipusUser(this.id, formData).subscribe({
        next: () => {
          console.log('TipusUser updated successfully');
          this.router.navigate(['/tipus-user-list']);
        },
        error: (error) => {
          console.error('Error updating tipusUser:', error);
        }
      });
    }
  }  
}
