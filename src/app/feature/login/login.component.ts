import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DashboardService } from '../../core/services/dashboard.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  txtErrorUser = '';
  txtErrorPassword = '';
  txtErrorPrivacy = ''

  constructor(private _formBuilder: FormBuilder, private _dashboardService: DashboardService, private router: Router,  private _storageService: StorageService) {
    this.buildForm();
   
  }

  ngOnInit(): void {
    const resp = new Promise((resolve, reject) => {
      this._dashboardService.getAllPlayers()
        .subscribe(resolve, reject);
    });
  }

  private buildForm(): void {
    this.form = this._formBuilder.group({
      user: [null, [Validators.required]],
      password: [null, [Validators.required]],
      accept: [null, [Validators.required]],
    });

    this.txtErrorUser = 'Este campo es requerido';
    this.txtErrorPassword = 'Este campo es requerido';
    this.txtErrorPrivacy = 'Este campo es requerido';
  }

  loginSesion(event: Event) {
    event.preventDefault();
    if (this.form.valid && this.form.get('accept').value === true) {
      
      const value = this.form.value;
      const user = {
        usuario: value.user,
      }
      this._storageService.setItem('user', user);
      this.router.navigate(['/dashboard']);
    } else {
      this.form.markAllAsTouched();
    }
  }

  formIsValid(): boolean {
    const acceptControl = this.form.get('accept');
    return (
      this.form.invalid ||
      acceptControl.value === undefined ||
      acceptControl.value === false
    );
  }

  getClassInput(type: string): string {
    const control = this.form.get(type);
    return control.invalid && (control.dirty || control.touched)
      ? 'form-control  is-invalid'
      : 'form-control ';
  }

  getClassLabel(): string {
    const control = this.form.get('accept');
    return (control.invalid && (control.dirty || control.touched) || control.value === false)
      ? 'form-check-label  color-red '
      : 'form-check-label ';
  }

  showTextError(type: string): boolean {
    const control = this.form.get(type);
    return control.invalid && (control.dirty || control.touched);
  }

  getClassInputUser(): string {
    return this.getClassInput('user');
  }

  getClassInputPassword(): string {
    return this.getClassInput('password');
  }

  isShowTextErrorUser() {
    return this.showTextError('user');
  }

  isShowTextErrorPassword() {
    return this.showTextError('password');
  }

  isShowTextErrorPrivacy() {
    const control = this.form.get('accept');
    return (control.invalid && (control.dirty || control.touched) || control.value === false);
  }
}
