import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { TicketsService } from 'src/app/shared/services/tickets.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public tService: TicketsService, public auth: AuthService) { }

  ngOnInit(): void {
  }

  submitTicket(title: string, body: string, uid: string) {
    window.alert('Ticket submitted, an admin will review, thank you!');
    this.tService.createTicket(title, body, uid);
  }

}
