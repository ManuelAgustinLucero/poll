import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';


@Injectable()
export class ResponsePoll {
  ref = firebase.firestore().collection('respuestas');

  constructor(
   public afAuth: AngularFireAuth,
   
 ) {}

  postEncuesta(data): Observable<any> {
    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        observer.next({
          key: doc.id,
        });
      });
    });
  }
}
