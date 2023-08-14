import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, query, where,  } from '@angular/fire/firestore';
import Clients from '../interfaces/clients.interface';


@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  fecha = new Date();

  constructor(
    private firestore: Firestore,
    ) { }


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
   
  // getFilters(){
  //   .collection("clients")
  //   const clientRef = collection(this.firestore, 'clients');
  //    return collectionData(clientRef, { idField: 'id'}) as Observable<Clients[]>;

  //    .collection("clients")
  //    .where("date", "==", "2023")
  // }

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