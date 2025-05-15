import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/Auth/auth.service';
import { ErrorMessages } from '../../environments/errors.config';
import { AlertService } from '../../Services/Alert/alert.service';
import { NavigationConfig } from '../../environments/navigation.config';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class LoginComponent {
  loginForm: FormGroup;
  alertMessage: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    if (localStorage.getItem('token') !== null) {
      this.router.navigate([NavigationConfig.LOGIN]);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.status === 200 && response.data?.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
  
            this.authService.checkIfAdmin().subscribe(
              (isAdmin) => {
                const message = isAdmin ? 'Benvingut de nou Admin' : 'Has iniciat sessió correctament.';
                this.alertService.show('success', 'Benvingut', message);
                this.router.navigate([NavigationConfig.HOME]);
              },
              (error) => {
                this.alertService.show('success', 'Benvingut', 'Has iniciat sessió correctament.');
                this.router.navigate([NavigationConfig.HOME]);
              }
            );
          } else {
            this.alertService.show('error', ErrorMessages.LOGIN_FAILED, '');
            console.log(response);
            this.resetForm();
          }
          this.isSubmitting = false;
        },
        error: (error) => {
          this.alertService.show('error', ErrorMessages.INVALID_CREDENTIALS, '');
          console.log(error);
          this.resetForm();
          this.isSubmitting = false;
        }
      });
    } else {
      this.alertService.show('warning', 'Tots els camps són obligatoris', '');
    }
  }
  

  forgotPassword(): void {
    this.router.navigate([NavigationConfig.FORGOT_PASSWORD]);
  }

  private resetForm(): void {
    this.loginForm.reset();
    this.isSubmitting = false;
  }
}
