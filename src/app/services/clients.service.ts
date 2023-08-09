import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, query, where } from '@angular/fire/firestore';
import Clients from '../interfaces/clients.interface';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  fecha = new Date();

  constructor(private firestore: Firestore) { }


  addService(client: Clients) {
    const clientRef = collection(this.firestore, 'clients');
    return addDoc(clientRef, client);
  }

  // getService(): Observable<Clients[]> {
  //   const clientRef = collection(this.firestore, 'clients');
  //   return collectionData(clientRef, { idField: 'id'}) as Observable<Clients[]>;
  // }

  getService(): Observable<Clients[]> {
    const clientRef = collection(this.firestore, 'clients');
    return collectionData(clientRef, { idField: 'id'}) as Observable<Clients[]>;


  }


  deleService(client: Clients) {
    const placeDocRef = doc(this.firestore, `clients/${client.id}`);
    return deleteDoc(placeDocRef);
  }
}


    // let timeRef = new Date();
    // timeRef.getFullYear();    
    // console.log(timeRef); 
    // timeRef.setFullYear(2020);
   // console.log(timeRef)