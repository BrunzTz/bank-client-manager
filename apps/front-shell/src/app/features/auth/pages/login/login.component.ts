import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  invalidCredentials = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  signUpForm = this.fb.group({
    username: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  });

  ngOnInit() {
    const switchers: NodeListOf<Element> = document.querySelectorAll('.switcher');

    switchers.forEach((item: Element) => {
      item.addEventListener('click', function (this: Element) {
        switchers.forEach((el: Element) => {
          el.parentElement?.classList.remove('is-active');
        });

        this.parentElement?.classList.add('is-active');
      });
    });
  }

  async submit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.invalidCredentials = false;
      this.errorMessage = 'Preencha os campos corretamente antes de submeter.';
      this.successMessage = '';
      return;
    }

    this.isLoading = true;
    this.invalidCredentials = false;
    this.errorMessage = '';
    this.successMessage = '';

    const username = (this.loginForm.value.username ?? '').trim();
    const password = (this.loginForm.value.password ?? '').trim();

    const success = await this.authService.login(username, password);

    this.isLoading = false;

    if (!success) {
      this.invalidCredentials = true;
      this.errorMessage = 'Usuário ou senha incorretos. Faça cadastro primeiro ou use credenciais corretas.';
      return;
    }

    this.invalidCredentials = false;
    this.errorMessage = '';
    await this.router.navigate(['/clients/query']);
  }

  async signUp(): Promise<void> {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      this.errorMessage = 'Preencha os campos corretamente para cadastrar.';
      this.successMessage = '';
      return;
    }

    const username = (this.signUpForm.value.username ?? '').trim();
    const password = (this.signUpForm.value.password ?? '').trim();
    const confirmPassword = (this.signUpForm.value.confirmPassword ?? '').trim();

    if (password !== confirmPassword) {
      this.errorMessage = 'Senhas não conferem.';
      this.successMessage = '';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const success = await this.authService.register(username, password);
    this.isLoading = false;

    if (!success) {
      this.errorMessage = 'Cadastro falhou: e-mail já existe ou senha inválida.';
      this.successMessage = '';
      return;
    }

    this.errorMessage = '';
    this.successMessage = 'Cadastro realizado com sucesso! Faça login agora.';
    this.signUpForm.reset();

    // switch to login tab
    const loginTab = document.querySelector('.switcher-login');
    loginTab?.parentElement?.classList.add('is-active');
    const signupTab = document.querySelector('.switcher-signup');
    signupTab?.parentElement?.classList.remove('is-active');
  }

  hasError(controlName: string, errorName: string, isSignup = false): boolean {
    const form: any = isSignup ? this.signUpForm : this.loginForm;
    const control = form.get(controlName as keyof typeof form.controls);

    if (!control) {
      return false;
    }

    return control.touched && control.hasError(errorName);
  }
}

