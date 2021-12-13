import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClientsComponent } from './list-clients.component';
import { ClientService } from '@demo-repo/shared/core-api';
import { ChangeDetectorRef } from '@angular/core';
import { ClientReportUiModule } from '@demo-repo/client-report/ui';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveComponentModule } from '@ngrx/component';

describe('ListClientsComponent', () => {
  let component: ListClientsComponent;
  let fixture: ComponentFixture<ListClientsComponent>;
  let clientService: ClientService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ClientReportUiModule],
      declarations: [ListClientsComponent],
      providers: [ChangeDetectorRef],
    }).compileComponents();

    clientService = TestBed.inject(ClientService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
