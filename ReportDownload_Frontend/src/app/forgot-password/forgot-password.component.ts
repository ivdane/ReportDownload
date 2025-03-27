import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],  // Import necessary modules for the standalone component
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],  // Email field with validation
      mobileNumber: ['', [
        Validators.required, 
        Validators.pattern(/^\d{10}$/), // Validates 10 digit mobile number
      ]],
    });
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email;
      const mobileNumber = this.forgotPasswordForm.value.mobileNumber;
      // Handle the logic to send the verification code here
      console.log('Sending verification code to email:', email);
      console.log('Sending verification code to mobile:', mobileNumber);
    }
  }
}
