import { Component, ViewChildren, QueryList, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AlertService } from '../../Services/Alert/alert.service';
import { NavigationConfig } from '../../environments/navigation.config';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class ForgotPasswordComponent implements AfterViewInit {
  step = 1;
  emailForm: FormGroup;
  resetForm: FormGroup;
  isSubmitting = false;
  otpInputs = new Array(6);

  @ViewChildren('otpInput') otpInputElements!: QueryList<ElementRef>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      code: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.otpInputElements.first?.nativeElement.focus(), 0);
  }

  sendResetCode(): void {
    if (this.emailForm.invalid) {
      this.emailForm.markAllAsTouched();
      this.alertService.show('warning', 'El correu electrònic no és vàlid.', '', 3000);
      return;
    }

    this.isSubmitting = true;

    this.authService.forgotPassword(this.emailForm.value.email).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.alertService.show('info', 'Codi enviat al teu correu electrònic', '', 3000);
        this.resetForm.patchValue({ email: this.emailForm.value.email });
        this.step = 2;
      },
      error: () => {
        this.isSubmitting = false;
        this.alertService.show('error', 'Error enviant el codi. Si us plau, torna-ho a intentar.', '', 3000);
      }
    });
  }

  resetPassword(): void {
    this.resetForm.updateValueAndValidity();

    if (this.resetForm.invalid) {
      this.resetForm.markAllAsTouched();

      const errors = this.resetForm.errors;
      if (errors?.['passwordsMismatch']) {
        this.alertService.show('warning', 'Les contrasenyes no coincideixen.', '', 3000);
      } else {
        this.alertService.show('warning', 'Revisa tots els camps del formulari.', '', 3000);
      }

      return;
    }

    this.isSubmitting = true;

    this.authService.resetPassword(this.resetForm.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.alertService.show('success', 'Contrasenya restablerta correctament', '', 3000);
        this.router.navigate([NavigationConfig.LOGIN]);
      },
      error: () => {
        this.isSubmitting = false;
        this.alertService.show('error', 'Error al restablir la contrasenya. Si us plau, torna-ho a intentar més tard.', '', 3000);
      }
    });
  }

  passwordsMatchValidator(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirm = group.get('password_confirmation')?.value;
    return pass === confirm ? null : { passwordsMismatch: true };
  }

  onInput(event: any, index: number): void {
    const input = event.target;
    const value = input.value;

    if (/^\d$/.test(value) && index < this.otpInputElements.length - 1) {
      this.otpInputElements.toArray()[index + 1].nativeElement.focus();
    } else if (value.length > 1) {
      input.value = value.charAt(0);
    }

    this.updateCodeControl();
  }

  onKeyDown(event: KeyboardEvent, index: number): void {
    const key = event.key;
    const inputs = this.otpInputElements.toArray();

    if ((key === 'Backspace' || key === 'Delete') && index > 0 && !inputs[index].nativeElement.value) {
      inputs[index - 1].nativeElement.focus();
      inputs[index - 1].nativeElement.value = '';
    }

    if (!/^\d$/.test(key) && key !== 'Backspace' && key !== 'Delete' && key !== 'Tab') {
      event.preventDefault();
    }
  }

  onFocus(event: any): void {
    event.target.select();
  }

  handlePaste(event: ClipboardEvent): void {
    event.preventDefault();
    const text = event.clipboardData?.getData('text')?.trim();

    if (text && /^\d+$/.test(text)) {
      const digits = text.slice(0, this.otpInputs.length).split('');
      const inputs = this.otpInputElements.toArray();

      digits.forEach((digit, i) => {
        if (inputs[i]) {
          inputs[i].nativeElement.value = digit;
        }
      });

      this.updateCodeControl();
      if (inputs[digits.length - 1]) {
        inputs[digits.length - 1].nativeElement.focus();
      }
    }
  }

  updateCodeControl(): void {
    const code = this.otpInputElements.toArray().map(input => input.nativeElement.value).join('');
    this.resetForm.get('code')?.setValue(code);
  }
}
