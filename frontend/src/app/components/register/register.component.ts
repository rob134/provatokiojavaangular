// src/app/components/register/register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
  if (this.registerForm.valid) {
    	this.userService.register(this.registerForm.value).subscribe({
      	next: () => this.router.navigate(['/login']),
      	error: (error) => {
        	if (error.status === 409) {
          	alert('Email já está em uso!');
        	} else {
          	console.error("Erro ao registrar", error);
        	}
      	}
      });
  	}
  }
  
  navigateToLogin(): void {
  this.router.navigate(['/login']);
 }
 
}
