import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Client, ClientService } from '@demo-repo/shared/core-api';

@Component({
  selector: 'demo-repo-client-list-table',
  templateUrl: './client-list-table.component.html',
  styleUrls: ['./client-list-table.component.scss'],
})
export class ClientListTableComponent {
  @Input() clientList: Client[] = [];
  editValues:boolean=false;
  constructor(private clientSer:ClientService, private route: Router){

  }

  columns = [
    { header: 'Action', field: 'action' },
    { header: 'Name', field: 'name' },
    { header: 'Gender', field: 'gender' },
    { header: 'Birth Date', field: 'birthDate' },
    { header: 'IBAN', field: 'iban' },
    { header: 'Email', field: 'email' },
    { header: 'Full Address', field: 'address' },
  ];

  editDetails(tableData:any){
    this.editValues=true;
    this.clientSer.clientData$.next(tableData);
    this.route.navigate(['client-list', 'client', tableData._id])
  }
}
