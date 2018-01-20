import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { AfDatabaseService } from '../_services/af-database.service';
import * as moment from 'moment';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
	@ViewChild('chart') el: ElementRef;
	
	weight;
	date;

	constructor (
		private afDatabaseService: AfDatabaseService,
    private afAuth: AngularFireAuth,  
		private ngZone: NgZone) 
	{
		window.onresize = (e) =>
	  {
	      ngZone.run(() => {
	      	this.resizeChart(window.innerWidth);
	      });
	  };
	}

	ngOnInit() {
		this.afDatabaseService.getData().subscribe(data => this.initChart(data));
	}

	initChart(data) {
		const element = this.el.nativeElement;
    const style = { 
    	margin: { t: 0, r: 0, l: 30},
    	type: 'date',
    }
		let values = [{ 
			x: [], 
			y: [],
			type: 'scatter'
		}];

		Plotly.purge(element);
		for (let val in data) {
			values[0].x.push(val);
			values[0].y.push(data[val]);
		}
    Plotly.plot(element, values, style, {displayModeBar: false})
	}

	resizeChart(width) {
		const d3 = Plotly.d3, element = this.el.nativeElement;
		let WIDTH_IN_PERCENT_OF_PARENT, HEIGHT_IN_PERCENT_OF_PARENT;

		if (width > 1024) {
			WIDTH_IN_PERCENT_OF_PARENT = 83;
			HEIGHT_IN_PERCENT_OF_PARENT = 100;
		} else if (width > 449) {
			WIDTH_IN_PERCENT_OF_PARENT = 100;
			HEIGHT_IN_PERCENT_OF_PARENT = 75;
		} else {
			WIDTH_IN_PERCENT_OF_PARENT = 100;
			HEIGHT_IN_PERCENT_OF_PARENT = 60;
		}

		let gd3 = d3.select(element).style({
	    width: WIDTH_IN_PERCENT_OF_PARENT + '%',
	    height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
		});

	  let my_Div = gd3.node();
	  Plotly.Plots.resize(my_Div)
	}

	onSubmit() {
		let data = {};
		this.date = moment(this.date).format('YYYY-MM-DD');
		data[this.date] = this.weight;
		this.afDatabaseService.pushData(data);
	}

	onLogout() {
    this.afAuth.auth.signOut();
	}

}
