import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientManagementPageComponent } from './client-management-page.component';

describe('ClientManagementPageComponent', () => {
  let component: ClientManagementPageComponent;
  let fixture: ComponentFixture<ClientManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
