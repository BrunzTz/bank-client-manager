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
  value!: string;

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  ngOnInit(){
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

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const username = this.form.value.username ?? '';
    const password = this.form.value.password ?? '';

    const success = this.authService.login(username, password);

    if (!success) {
      this.invalidCredentials = true;
      return;
    }

    this.invalidCredentials = false;
    this.router.navigate(['/clients/query']);
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }
}