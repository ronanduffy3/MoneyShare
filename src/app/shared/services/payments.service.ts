import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  userId: string;
  membership: any;

  constructor(private db: AngularFirestore, private auth: AngularFireAuth) { 
    
  }
}
