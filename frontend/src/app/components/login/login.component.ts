// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  	onSubmit(): void {
    if (this.loginForm.valid) {
        this.userService.login(this.loginForm.value).subscribe({
            next: (response: any) => {
                // Armazene o token e as informações do usuário
                localStorage.setItem('currentUser', JSON.stringify(response));
                localStorage.setItem('token', response.token); // Armazene o token separadamente
                this.router.navigate(['/dashboard']);
            },
            error: (error: any) => console.error("Erro ao fazer login", error)
        });
    }
}
  
   navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
