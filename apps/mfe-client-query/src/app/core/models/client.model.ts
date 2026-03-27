export interface Client {
  id: string;
  companyName: string;
  tradeName: string;
  cnpj: string;
  email: string;
  phone: string;
  status: 'ACTIVE' | 'INACTIVE';
  createdAt: string;
}