import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  ref = firebase.firestore().collection('encuestas');

  constructor() { }



  
  // public add(socio: Socio): Observable<Object> {
  //   return this.post('socio/new', null, socio);
  // }
  getAll(): Observable<any>{
    return new Observable((observer) => {
      this.ref.get().then(snapshot => {
        snapshot.forEach(doc => {
          let boards = [];
          let data = doc.data();
          boards.push({
            id: doc.id,
            encuesta: data.encuesta,
          });
          observer.next(boards);
        });
      });
    });
  }
  getBoards(): Observable<any> {

    return new Observable((observer) => {

      this.ref.onSnapshot((querySnapshot) => {

        let boards = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          boards.push({
            key: doc.id,
            encuesta: data.encuesta,
          });
        });
        observer.next(boards);
      });
    });
  }

  getBoard(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc) => {
        let data = doc.data();
        console.log(data);
        observer.next({
          key: doc.id,
          encuesta: data.encuesta,
        });
      });
    });
  }

 

  updateBoards(id: string, data): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }

  deleteBoards(id: string): Observable<{}> {
    return new Observable((observer) => {
      this.ref.doc(id).delete().then(() => {
        observer.next();
      });
    });
  }
}
