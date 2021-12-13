import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../model/client';
import { delay, tap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientList$ = new BehaviorSubject<Client[]>([]);
  clientData$ = new BehaviorSubject({});

  constructor(private http: HttpClient) {}

  getClients() {
    return this.http.get<any>('../assets/clients-large.json').pipe(
      tap((response) => {
        response = this.adjustAddress(response);
        this.clientList$.next(response);
      })
    );
  }

  private adjustAddress(responseClientList: Client[]) {
    responseClientList.forEach((client) => {
      client.address =
        client.houseNr +
        '-' +
        client.addition +
        ',' +
        client.street +
        ',' +
        client.city +
        ' ' +
        client.country;
    });
    return responseClientList;
  }

  ibanApi(value: string) {
    return this.http.get(
      `https://api.ibanapi.com/v1/validate/${value}?api_key=cf99cdc167f33ef4a56473344b233d74f32bfb65`
    )
  }
}
