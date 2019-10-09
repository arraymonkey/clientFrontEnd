import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
// const printJS = require('print-js');
// @ts-ignore
import * as printJS from 'print-js';
import {InvoiceDetailsService} from '../../../shared/invoice-details.service';
import {AlertService} from '../../../shared/alert.service';
import {AppService} from '../../../shared/app.service';
import {SalesService} from '../../../shared/sales.service';


@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  providers: []
})
export class InvoiceDetailsComponent implements OnInit {

	UrlParams:any;
	invoice:any;
	invoiceDetails:any = {
    settingData:'',
		name:'',
		email:'',
    phone:'',
    discount:'',
		vat:'',
		invoice_code:'',
		invoice_info:'',
		date:'',
		due:'',
		sub_total:'',
		grand_total:'',
    payment_info:'',

    total_paid:''
	};
  showloding = true;
  lodingImage = false;
	constructor(
    public router: Router,
		public activatedRoute: ActivatedRoute,
    private dataService:InvoiceDetailsService,
    private AppService:AppService,
		private alertService:AlertService,
	) { }

	ngOnInit() {

    setTimeout(() => {
          this.showloding = false;
          this.lodingImage = true;
      },500);
  	this.activatedRoute.params.subscribe(params => {
      this.UrlParams = params['id'];
    });

    this.dataService.getInvoiceDetails(this.UrlParams)
        .pipe().subscribe(data => {
            this.invoice = data['invoice'];
            this.invoiceDetails = {
              settingData:this.invoice.settingData,
              name:this.invoice.name,
              email:this.invoice.email,
              phone:this.invoice.phone,
              discount:this.invoice.discount,
              vat:this.invoice.vat,
              invoice_code:this.invoice.invoice_code,
              date:this.invoice.date,
              due:this.invoice.due,
              sub_total:this.invoice.sub_total,
              grand_total:this.invoice.grand_total,
              invoice_info:this.invoice.invoice_info,
              payment_info:this.invoice.payment_info,
              total_paid:this.invoice.total_paid
            };

    });
	}

  printView(){
    printJS({ printable: 'printJS-form', type: 'html',scanStyles: true,style:'width:100%',ignoreElements:['footers'],maxWidth:1400,css: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'})
    return false;
  }
}
