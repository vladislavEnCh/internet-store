import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { IUser } from './../../shared/interfaces/auth.interfaces';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  public loginAdminForms!: FormGroup;
  public submitted: boolean = false;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginAdminForms = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(2),
      ]),
    });
  }

  submit() {
    if (this.loginAdminForms.invalid) {
      return;
    }
    this.submitted = true;
    const user: IUser = {
      email: this.loginAdminForms.value.email,
      password: this.loginAdminForms.value.password,
      returnSecureToken: true,
    };
    this.auth.login(user).subscribe(
      (res) => {
        this.loginAdminForms.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.submitted = false;
      },
      () => {
        this.submitted = false;
      }
    );
  }
}
