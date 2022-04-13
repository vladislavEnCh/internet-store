import { ClientAuthService } from './../../shared/clientServices/client-auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
})
export class AuthPageComponent implements OnInit {
  authForm!: FormGroup;
  error$: any = this.clientAuthService.error$;
  notify$!: any;
  constructor(private clientAuthService: ClientAuthService) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  login() {
    this.clientAuthService.login(this.authForm.value);
  }
  registration() {
    this.notify$ = null;

    this.clientAuthService
      .registration(this.authForm.value)
      .pipe()
      .subscribe((res: any) => (this.notify$ = res.message));
  }
}
