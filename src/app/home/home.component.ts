import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AfDatabaseService } from '../_services/af-database.service';
import * as moment from 'moment';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	@ViewChild('chart') el: ElementRef;

	weight;
	date;

	constructor (private afDatabaseService: AfDatabaseService) { }

	ngOnInit() {
		this.afDatabaseService.getData().subscribe(data => this.initChart(data));
	}

	initChart(data) {
		const element = this.el.nativeElement
    const style = { 
    	margin: { t: 0 },
    	type: 'date'
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
    Plotly.plot(element, values, style)
	}

	onSubmit() {
		let data = {};
		this.date = moment(this.date).format('YYYY-MM-DD');
		data[this.date] = this.weight;
		this.afDatabaseService.pushData(data);
	}

}
