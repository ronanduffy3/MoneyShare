import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  constructor() { }

  const stripe = Stripe('pk_test_51Idtf1KYnMUErodckvcXFnczWEM4yqRh58QFUUveFZqB3vtRmW2RMtXaw8D0OBpRMyDnUgRwRJW8NlGxbIZPjcQZ00JD7vL9vi');
  const elements = this.stripe.elements();

  ngOnInit(): void {
  }

}
