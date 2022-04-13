import { ClientAuthService } from './../shared/clientServices/client-auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthPageComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [],
})
export class AuthPageModule {}
