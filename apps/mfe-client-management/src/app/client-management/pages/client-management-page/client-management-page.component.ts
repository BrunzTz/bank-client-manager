import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';

type ManagementAction = 'create' | 'edit' | 'delete';

@Component({
  selector: 'app-client-management-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    SelectModule
  ],
  templateUrl: './client-management-page.component.html',
  styleUrl: './client-management-page.component.scss'
})
export class ClientManagementPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly clientService = inject(ClientService);

  statusOptions = [
    { label: 'Ativo', value: 'ATIVO' },
    { label: 'Inativo', value: 'INATIVO' },
    { label: 'Pendente', value: 'PENDENTE' }
  ];

  mode: ManagementAction = 'create';
  clientId: string | null = null;
  client: Client | null = null;
  loading = false;
  submitting = false;

  form = this.fb.group({
    companyName: ['', [Validators.required]],
    tradeName: ['', [Validators.required]],
    cnpj: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    status: ['ACTIVE', [Validators.required]]
  });

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      const action = params.get('action');
      const id = params.get('id');

      if (action === 'create' || action === 'edit' || action === 'delete') {
        this.mode = action;
      } else {
        this.mode = 'create';
      }

      this.clientId = id;

      if (this.mode === 'create') {
        this.client = null;
        this.resetForm();
        return;
      }

      if (!this.clientId) {
        console.error('ID do cliente não informado.');
        return;
      }

      this.loadClient(this.clientId);
    });
  }

  loadClient(id: string): void {
    this.loading = true;

    this.clientService.getClientById(id).subscribe({
      next: (client) => {
        this.client = client;
        this.patchForm(client);

        if (this.mode === 'delete') {
          this.form.disable();
        } else {
          this.form.enable();
        }

        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar cliente:', error);
        this.loading = false;
      }
    });
  }

  resetForm(): void {
    this.form.enable();
    this.form.reset({
      companyName: '',
      tradeName: '',
      cnpj: '',
      email: '',
      phone: '',
      status: 'ACTIVE'
    });
  }

  patchForm(client: Client): void {
    this.form.patchValue({
      companyName: client.companyName,
      tradeName: client.tradeName,
      cnpj: client.cnpj,
      email: client.email,
      phone: client.phone,
      status: client.status
    });
  }

  submit(): void {
    if (this.mode === 'delete') {
      this.confirmDelete();
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      companyName: this.form.getRawValue().companyName ?? '',
      tradeName: this.form.getRawValue().tradeName ?? '',
      cnpj: this.form.getRawValue().cnpj ?? '',
      email: this.form.getRawValue().email ?? '',
      phone: this.form.getRawValue().phone ?? '',
      status: (this.form.getRawValue().status ?? 'ACTIVE') as 'ACTIVE' | 'INACTIVE'
    };

    this.submitting = true;

    if (this.mode === 'create') {
      this.clientService.createClient(payload).subscribe({
        next: () => this.navigateBackToQuery(),
        error: (error) => {
          console.error('Erro ao criar cliente:', error);
          this.submitting = false;
        }
      });
      return;
    }

    if (this.mode === 'edit' && this.clientId) {
      this.clientService.updateClient(this.clientId, payload).subscribe({
        next: () => this.navigateBackToQuery(),
        error: (error) => {
          console.error('Erro ao editar cliente:', error);
          this.submitting = false;
        }
      });
    }
  }

  confirmDelete(): void {
    if (!this.clientId) {
      return;
    }

    this.submitting = true;

    this.clientService.deleteClient(this.clientId).subscribe({
      next: () => this.navigateBackToQuery(),
      error: (error) => {
        console.error('Erro ao excluir cliente:', error);
        this.submitting = false;
      }
    });
  }

  navigateBackToQuery(): void {
    this.submitting = false;
    this.router.navigate(['/home']);
  }

  cancel(): void {
    this.navigateBackToQuery();
  }

  getPageTitle(): string {
    if (this.mode === 'create') return 'Novo Cliente';
    if (this.mode === 'edit') return 'Editar Cliente';
    return 'Excluir Cliente';
  }

  getPageDescription(): string {
    if (this.mode === 'create') return 'Preencha os dados para cadastrar um novo cliente.';
    if (this.mode === 'edit') return 'Atualize as informações do cliente selecionado.';
    return 'Confirme a exclusão do cliente selecionado.';
  }

  getPrimaryButtonLabel(): string {
    if (this.mode === 'create') return 'Criar Cliente';
    if (this.mode === 'edit') return 'Salvar Alterações';
    return 'Confirmar Exclusão';
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }
}