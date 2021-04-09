import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ticket } from '../interfaces/tickets';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(public fireStore: AngularFirestore) { }

  documentCounter: number;
  ticketToAdd: Ticket;

  getTickets() {
    return this.fireStore.collection('tickets').snapshotChanges();
  }

  createTicket(tTitle: string, tBody: string) {

    this.fireStore.collection('tickets').valueChanges().subscribe(result => {
      this.documentCounter = result.length + 1;
    });

    this.ticketToAdd = {
      title : tTitle,
      body : tBody,
      id : 1
    };

    return this.fireStore.collection('tickets').add(this.ticketToAdd);
  }


}
