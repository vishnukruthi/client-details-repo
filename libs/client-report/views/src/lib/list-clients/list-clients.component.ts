import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import { ClientService } from '@demo-repo/shared/core-api';

@Component({
  selector: 'demo-repo-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListClientsComponent implements OnInit {
  clientList$ = this.clientService.clientList$;

  constructor(private readonly clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients().subscribe();
  }
}
