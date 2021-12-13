import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListTableComponent } from './client-list-table/client-list-table.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ClientEditFormComponent } from './client-edit-form/client-edit-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [ClientListTableComponent, ClientEditFormComponent],
  exports: [ClientListTableComponent],
})
export class ClientReportUiModule {}
