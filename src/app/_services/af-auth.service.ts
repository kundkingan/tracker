import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class AfAuthService {

  private authStateSource = new Subject<any>();

  getAuthState$ = this.authStateSource.asObservable();
	userId;

  constructor(public afAuth: AngularFireAuth)
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

}
