import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss'
})
export class ClientListComponent implements OnInit {
  private readonly clientService = inject(ClientService);
  private readonly router = inject(Router);

  clients: Client[] = [];
  loading = true;

  ngOnInit(): void {
    this.loadClients();
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

  goToCreate(): void {
    this.router.navigate(['/clients/management'], {
      queryParams: { action: 'create' }
    });
  }

  goToEdit(clientId: string): void {
    this.router.navigate(['/clients/management'], {
      queryParams: { action: 'edit', id: clientId }
    });
  }

  goToDelete(clientId: string): void {
    this.router.navigate(['/clients/management'], {
      queryParams: { action: 'delete', id: clientId }
    });
  }

  getSeverity(status: Client['status']): 'success' | 'danger' {
    return status === 'ACTIVE' ? 'success' : 'danger';
  }

  getStatusLabel(status: Client['status']): string {
    return status === 'ACTIVE' ? 'Ativo' : 'Inativo';
  }
}