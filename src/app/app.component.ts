import { Component, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


import { LoginComponent } from './login/login.component';
import { AfDatabaseService } from './_services/af-database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  signedIn = false;

  constructor(
    public afDatabaseService: AfDatabaseService, 
    public afAuth: AngularFireAuth, 
    public dialog: MatDialog) 
  {
    this.afDatabaseService.getAuthState$.subscribe(signedIn => this.handleAuthState(signedIn));
  }

  handleAuthState(signedIn) {
    if (signedIn) {
      this.signedIn = true;
    } else {
      this.signedIn = false;
      let dialogRef = this.dialog.open(LoginComponent);
    }
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  
}
