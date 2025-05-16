import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../Services/Auth/auth.service';
import { AlertService } from '../../Services/Alert/alert.service';
import { Router } from '@angular/router';
import { NavigationConfig } from '../../environments/navigation.config';
import { IconComponent } from '../../components/icon/icon.component';

@Component({
  selector: 'app-student-registration',
  templateUrl: './student-registration.component.html',
  styleUrls: ['./student-registration.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IconComponent],
})
export class StudentRegistrationComponent {
  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isSubmitting = true;

      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          if (response.status === 201) {
            this.alertService.show('success', 'Registre completat', 'Benvingut!');
            this.router.navigate([NavigationConfig.LOGIN]);
          } else {
            this.alertService.show('error', 'Error de registre', 'Revisa les dades.');
          }
          this.isSubmitting = false;
        },
        error: (err) => {
          this.alertService.show('error', 'Error', 'No s’ha pogut completar el registre.');
          console.error(err);
          this.isSubmitting = false;
        }
      });
    } else {
      this.alertService.show('warning', 'Tots els camps són obligatoris', '');
    }
  }

  navigateToLogin(): void {
    this.router.navigate([NavigationConfig.LOGIN]);
  }
}
