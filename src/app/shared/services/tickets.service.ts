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

  createTicket(tTitle: string, tBody: string, tUid: string) {

    this.fireStore.collection('tickets').valueChanges().subscribe(result => {
      this.documentCounter = result.length + 1;
    });

    this.ticketToAdd = {
      title : tTitle,
      body : tBody,
      uid: tUid,
      id : this.documentCounter,
      completed: false
    };

    return this.fireStore.collection('tickets').add(this.ticketToAdd);
  }


}
