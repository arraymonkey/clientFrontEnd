import {Component, OnInit} from '@angular/core';
import {PosService, ServiceTicket} from './pos.service';
import {DndDropEvent} from 'ngx-drag-drop';
import * as moment from 'moment';
import {Observable} from 'rxjs';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {TestObject} from 'protractor/built/driverProviders';
import {AlertService} from '../../shared/alert.service';
import {SalesService} from '../../shared/sales.service';
import {AppService} from '../../shared/app.service';
import {HttpClient} from '@angular/common/http';

const now = new Date();


@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss']
})
export class PosComponent implements OnInit {
  // salesAddForm: FormGroup;
  base = 'http://localhost:8080/';
  salesAddForm = null;
  sales: any;
  private didPaypalScriptLoad: boolean = false;

  constructor(
    private http: HttpClient,
    public router: Router,
    private _fb: FormBuilder,
    private alertService: AlertService,
    private dataService: SalesService,
    private AppService: AppService,
    private parserFormatter: NgbDateParserFormatter
  ) {
  }

  allCustomer: any[] = [];
  customerDiscount: any;
  categoryList: any[] = [];
  subCat: any[] = [];
  // subCat = {};
  productList: any[] = [];
  objArray: TestObject[];
  bsValue: Date = new Date();
  paymentTypeList = [{id: 1, name: 'cash'}, {id: 2, name: 'check'}, {id: 3, name: 'card'}];
  showloding = true;
  lodingImage = false;

  ngOnInit() {
    setTimeout(() => {
      this.showloding = false;
      this.lodingImage = true;
    }, 500);
    let d = new Date();
    let formatDate = moment(d).format('YYYY-MM-DD');
    let randomnumber = moment(d).format('YYMMDDHHmmss');

    let dateArry = formatDate.split('-');
    let setDate = {year: Number(dateArry[0]), month: Number(dateArry[1]), day: Number(dateArry[2])};
    // usually you'd grab this from a backend API
    this.sales = {
      invoiceCode: randomnumber,
      customer: '',
      date: setDate,
      allCategory: '',
      allProduct: '',
      subTotal: '',
      discount: '0',
      vat: '0',
      grandTotal: '',
      receivedAmount: '',
      due: '',
      paymentType: '0',
      products: [
        // {amount: 111.11, date: "Jan 1, 2016", final: false},
        // {amount: 222.22, date: "Jan 2, 2016", final: true}
      ]
    };

    // initialize form with empty FormArray for products
    this.salesAddForm = new FormGroup({
      invoiceCode: new FormControl(''),
      customer: new FormControl('', Validators.compose([Validators.required])),
      date: new FormControl(''),
      allCategory: new FormControl('', Validators.compose([Validators.required])),
      allProduct: new FormControl('', Validators.compose([Validators.required])),
      subTotal: new FormControl(''),
      discount: new FormControl(''),
      vat: new FormControl(''),
      grandTotal: new FormControl(''),
      receivedAmount: new FormControl('', Validators.compose([Validators.required])),
      due: new FormControl(''),
      paymentType: new FormControl(''),
      products: new FormArray([])
    });


  }





}
