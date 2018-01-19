import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AfDatabaseService {

  private authStateSource = new Subject<any>();

  getAuthState$ = this.authStateSource.asObservable();
	userId;
	dataObject;

  constructor(private db: AngularFireDatabase, public afAuth: AngularFireAuth)
  {
    this.afAuth.authState.subscribe(user => this.handleAuthState(user))
  }

  handleAuthState(user) {
    if (user) {
      this.userId = user.uid;
    }
    this.sendAuthState(user);
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  sendAuthState(data) {
    this.authStateSource.next(data);
  }

  getDataObject() {
    this.dataObject = this.db.list(`weights/${this.userId}`);
    return this.dataObject;
  }

  createItem(data)  {
    this.dataObject.push(data);
  }

  getData(): Observable<any> {
  	return this.db.object(`weights/${this.userId}`).valueChanges();
  }

  pushData(data) {
  	this.db.object(`weights/${this.userId}`).update(data);
  }

}
