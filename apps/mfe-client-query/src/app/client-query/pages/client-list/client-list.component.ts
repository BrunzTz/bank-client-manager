import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject } from '@angular/core';
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
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit, OnDestroy {
  private readonly clientService = inject(ClientService);

  clients: Client[] = [];
  loading = true;
  page = 1;
  pageSize = 10;

  feedbackVisible = false;
  feedbackMessage = '';
  feedbackType: 'success' | 'error' | '' = '';
  private managementEventHandler?: (event: Event) => void;

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.clients.length / this.pageSize));
  }

  get pagedClients(): Client[] {
    const start = (this.page - 1) * this.pageSize;
    return this.clients.slice(start, start + this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get showingFrom(): number {
    if (!this.clients.length) {
      return 0;
    }
    return (this.page - 1) * this.pageSize + 1;
  }

  get showingTo(): number {
    return Math.min(this.clients.length, this.page * this.pageSize);
  }

  ngOnInit(): void {
    this.loadClients();

    this.managementEventHandler = (event: Event) => {
      const customEvent = event as CustomEvent<ClientManagementEventPayload>;
      const detail = customEvent.detail;
      if (!detail || detail.action !== 'query') {
        return;
      }

      this.loadClients();

      if (detail.feedbackMessage && detail.feedbackType) {
        this.showFeedback(detail.feedbackMessage, detail.feedbackType);
      }
    };

    window.addEventListener(CLIENT_MANAGEMENT_EVENT, this.managementEventHandler);
  }

  loadClients(): void {
    this.loading = true;

    this.clientService.getClients().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.loading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar clientes:', error);
        this.loading = false;
      }
    });
  }

  private emitClientManagementAction(action: ManagementAction, clientId?: string): void {
    const payload: ClientManagementEventPayload = { action, clientId };
    window.dispatchEvent(new CustomEvent(CLIENT_MANAGEMENT_EVENT, { detail: payload }));
  }

  goToCreate(): void {
    this.emitClientManagementAction('create');
  }

  goToEdit(clientId: string): void {
    this.emitClientManagementAction('edit', clientId);
  }

  goToDelete(clientId: string): void {
    this.emitClientManagementAction('delete', clientId);
  }

  getSeverity(status: Client['status']): 'success' | 'danger' {
    return status === 'ACTIVE' ? 'success' : 'danger';
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.page = page;
  }

  previousPage(): void {
    this.setPage(this.page - 1);
  }

  nextPage(): void {
    this.setPage(this.page + 1);
  }

  getStatusLabel(status: Client['status']): string {
    return status === 'ACTIVE' ? 'Ativo' : 'Inativo';
  }

  showFeedback(message: string, type: 'success' | 'error'): void {
    this.feedbackMessage = message;
    this.feedbackType = type;
    this.feedbackVisible = true;

    setTimeout(() => {
      this.feedbackVisible = false;
    }, 3200);
  }

  ngOnDestroy(): void {
    if (this.managementEventHandler) {
      window.removeEventListener(CLIENT_MANAGEMENT_EVENT, this.managementEventHandler);
    }
  }
}