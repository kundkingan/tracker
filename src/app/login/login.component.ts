import { Component, OnInit, Inject  } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { AfDatabaseService } from '../_services/af-database.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent{

	constructor(
		public dialogRef: MatDialogRef<LoginComponent>,
		private afDatabaseService: AfDatabaseService,
		@Inject(MAT_DIALOG_DATA) public data: any) 
	{ 
		this.afDatabaseService.getAuthState$.subscribe(user => {
			if (user) this.dialogRef.close();
		})

	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	login() {
		this.afDatabaseService.login();
	}

}
