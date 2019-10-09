import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartTheme, ILoadedEventArgs, IPointRenderEventArgs} from '@syncfusion/ej2-charts';
import {Browser} from '@syncfusion/ej2-base';
import {ChartComponent} from '@syncfusion/ej2-angular-charts';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
  }
  public radius: Object = { bottomLeft: 10, bottomRight: 10, topLeft: 10, topRight: 10 }

  date: number = Date.now();
  public data: Object[] = [
    {x: 'Sun', y: 500}, {x: 'Mon', y: 400},
    {x: 'Tue', y: 700},
    {x: 'Wed', y: 1500},
    {x: 'Thu', y: 2000}, {x: 'Fri', y: 900},
    {x: 'Sat', y: 1500},
  ];
  public data1: Object[] = [
    {x: 'Sun', y: 300}, {x: 'Mon', y: 600},
    {x: 'Tue', y: 400},
    {x: 'Wed', y: 1500},
    {x: 'Thu', y: 700}, {x: 'Fri', y: 2000},
    {x: 'Sat', y: 500}
  ];
  public data2: Object[] = [
    {x: 'Sun', y: 500}, {x: 'Mon', y: 700},
    {x: 'Tue', y: 200},
    {x: 'Wed', y: 1500},
    {x: 'Thu', y: 455}, {x: 'Fri', y: 900},
    {x: 'Sat', y: 700},
  ];

  public data4: Object[] = [
    {x: 'Sun', y: 30}, {x: 'Mon', y: 22},
    {x: 'Tue', y: 32},
    {x: 'Wed', y: 31},
    {x: 'Thu', y: 29}, {x: 'Fri', y: 31},
    {x: 'Sat', y: 50},
  ];
  public chartArea: Object = {
    border: {
      width: 0
    }
  };
  public width: string = Browser.isDevice ? '100%' : '90%';
  //Initializing Primary X Axis
  public primaryXAxis: Object = {
    valueType: 'Category',
    interval: 1, majorGridLines: {width: 0},
    labelIntersectAction: 'Rotate90'
  };
  //Initializing Primary Y Axis
  public primaryYAxis: Object = {
    labelFormat: '${value}',
    lineStyle: {width: 0},
    majorTickLines: {width: 0},
    minorTickLines: {width: 0}
  };
  public primaryYAxis2: Object = {
    labelFormat: '{value}',
    lineStyle: {width: 0},
    majorTickLines: {width: 0},
    minorTickLines: {width: 0}
  };
  public marker: Object = {
    visible: true,
    width: 10,
    height: 10
  };
  public tooltip: Object = {
    enable: true
  };

  // custom code start
  public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme> (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark');
  };

  // custom code end
  @ViewChild('roundcol', {static: true})
  public chart: ChartComponent;

  constructor() {
    //code
  };

  public pointRender(args: IPointRenderEventArgs): void {
    let materialColors: string[] = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
      '#ea7a57', '#404041', '#00bdae'];
    let fabricColors: string[] = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
      '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
    let bootstrapColors: string[] = ['#a16ee5', '#f7ce69', '#55a5c2', '#7ddf1e', '#ff6ea6',
      '#7953ac', '#b99b4f', '#407c92', '#5ea716', '#b91c52'];
    let highContrastColors: string[] = ['#79ECE4', '#E98272', '#DFE6B6', '#C6E773', '#BA98FF',
      '#FA83C3', '#00C27A', '#43ACEF', '#D681EF', '#D8BC6E'];
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
      args.fill = fabricColors[args.point.index % 10];
    } else if (selectedTheme === 'material') {
      args.fill = materialColors[args.point.index % 10];
    } else if (selectedTheme === 'highcontrast') {
      args.fill = highContrastColors[args.point.index % 10];
    } else {
      args.fill = bootstrapColors[args.point.index % 10];
    }
  };
}
