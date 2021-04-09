import { Component, OnInit } from '@angular/core';
import { TicketsService } from 'src/app/shared/services/tickets.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(public tService: TicketsService) { }

  ngOnInit(): void {
  }

}
