import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/shared/interfaces/tickets';
import { TicketsService } from 'src/app/shared/services/tickets.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  ticketListCompleted: Ticket[];
  ticketListNotCompleted: Ticket[];

  constructor(public tickets: TicketsService) { }

  ngOnInit(): void {
    this.tickets.getTicketsCompeted().valueChanges().subscribe(tickets => {
      this.ticketListCompleted = tickets;
      console.log(tickets);
    });

    this.tickets.getTicketsNotCompleted().valueChanges().subscribe(tickets => {
      this.ticketListNotCompleted = tickets;
      console.log(tickets);
    });
  }

}
