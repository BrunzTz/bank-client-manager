import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';

type ManagementAction = 'create' | 'edit' | 'delete' | 'query';

interface ClientManagementEventPayload {
  action: ManagementAction;
  clientId?: string | null;
  feedbackMessage?: string;
  feedbackType?: 'success' | 'error';
}

const CLIENT_MANAGEMENT_EVENT = 'client-management-action';

@Component({
  selector: 'app-client-management-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './client-management-page.component.html',
  styleUrl: './client-management-page.component.scss'
})
export class ClientManagementPageComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
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
  pageTitle = 'Novo Cliente';
  pageDescription = 'Preencha os dados para cadastrar um novo cliente.';
  primaryButtonLabel = 'Criar Cliente';

  form = this.fb.group({
    companyName: ['', [Validators.required]],
    tradeName: ['', [Validators.required]],
    cnpj: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    status: ['ACTIVE', [Validators.required]]
  });

  setClientManagementAction(payload: ClientManagementEventPayload): void {
    console.log('[ClientManagementPage] setClientManagementAction', payload);

    if (!payload || !payload.action) {
      return;
    }

    this.mode = payload.action;
    this.clientId = payload.clientId ?? null;

    if (this.mode === 'create') {
      this.client = null;
      this.resetForm();
      return;
    }

    if (this.mode === 'edit' || this.mode === 'delete') {
      if (!this.clientId) {
        console.error('ID do cliente não informado.');
        return;
      }
      this.loadClient(this.clientId);
      if (this.mode === 'delete') {
        this.form.disable();
      }
      this.pageTitle = this.setPageTitle();
      this.pageDescription = this.setPageDescription();
      this.primaryButtonLabel = this.setPrimaryButtonLabel();
      return;
    }
  }

  ngOnInit(): void {
    this.resetForm();
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

    console.log('Payload a ser enviado:', payload);
    console.log('Modo atual:', this.mode);

    if (this.mode === 'create') {
      this.clientService.createClient(payload).subscribe({
        next: () => {
          // Feedback será exibido na lista através do evento dispatched
          this.navigateBackToQuery('Cliente criado com sucesso!', 'success');
        },
        error: (error) => {
          console.error('Erro ao criar cliente:', error);
          this.submitting = false;
        }
      });
      return;
    }

    if (this.mode === 'edit' && this.clientId) {
      this.clientService.updateClient(this.clientId, payload).subscribe({
        next: () => {
          this.navigateBackToQuery('Cliente atualizado com sucesso!', 'success');
        },
        error: (error) => {
          console.error('Erro ao editar cliente:', error);
          this.submitting = false;
        }
      });
      return;
    }

    if (this.mode === 'delete' && this.clientId) {
      this.confirmDelete();
    }
  }

  confirmDelete(): void {
    console.log('Confirmando exclusão do cliente com ID:', this.clientId);
    if (!this.clientId) return;
    console.log('Confirmando exclusão do cliente com ID:', this.clientId);
    this.submitting = true;
    this.clientService.deleteClient(this.clientId).subscribe({
      next: () => {
        this.navigateBackToQuery('Cliente excluído com sucesso!', 'success');
      },
      error: (error) => {
        console.error('Erro ao excluir cliente:', error);
        this.submitting = false;
      }
    });
  }

  navigateBackToQuery(feedbackMessage?: string, feedbackType?: 'success' | 'error'): void {
    console.log('Navegando de volta para a tela de consulta...');
    this.submitting = false;
    const detail: any = { action: 'query' };

    if (feedbackMessage) {
      detail.feedbackMessage = feedbackMessage;
      detail.feedbackType = feedbackType ?? 'success';
    }

    window.dispatchEvent(
      new CustomEvent(CLIENT_MANAGEMENT_EVENT, {
        detail
      })
    );
  }

  cancel(): void {
    this.navigateBackToQuery();
  }

  ngOnDestroy(): void {
  }

  setPageTitle(): string {
    if (this.mode === 'create') return 'Novo Cliente';
    if (this.mode === 'edit') return 'Editar Cliente';
    if (this.mode === 'delete') return 'Excluir Cliente';
    return 'Cliente';
  }

  setPageDescription(): string {
    if (this.mode === 'create') return 'Preencha os dados para cadastrar um novo cliente.';
    if (this.mode === 'edit') return 'Atualize as informações do cliente selecionado.';
    if (this.mode === 'delete') return 'Confirme a exclusão do cliente. Esta ação não pode ser desfeita.';
    return '';
  }

  setPrimaryButtonLabel(): string {
    if (this.mode === 'create') return 'Criar Cliente';
    if (this.mode === 'edit') return 'Salvar Alterações';
    if (this.mode === 'delete') return 'Confirmar Exclusão';
    return 'Salvar';
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.form.get(controlName);
    return !!control && control.touched && control.hasError(errorName);
  }
}