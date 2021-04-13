import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Ticket } from '../interfaces/tickets';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  ticketListCompleted: AngularFireList<Ticket>;
  ticketListNotCompleted: AngularFireList<Ticket>;

  constructor(public fireStore: AngularFirestore, public db: AngularFireDatabase) {
    this.ticketListCompleted = this.db.list('tickets', ref => ref.orderByChild('completed').equalTo('true'));
    console.log(this.ticketListCompleted);
    this.ticketListNotCompleted = this.db.list('tickets', ref => ref.orderByChild('completed').equalTo('false'));
    this.ticketListCompleted.valueChanges().subscribe(ticket => console.log(ticket.toString()));
   }

  documentCounter: number;
  ticketToAdd: Ticket;


  getTicketsCompeted() {
    return this.ticketListCompleted;
  }

  getTicketsNotCompleted() {
    return this.ticketListNotCompleted;
  }

  createTicket(tTitle: string, tBody: string, tUid: string) {

    this.fireStore.collection('tickets').valueChanges().subscribe(result => {
      this.documentCounter = result.length + 1;
    });

    this.ticketToAdd = {
      title : tTitle,
      body : tBody,
      uid: tUid,
      id : 1,

    };

    return this.fireStore.collection('tickets').add(this.ticketToAdd);
  }


}
