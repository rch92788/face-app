import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import * as c3 from 'c3';
import { Subscription } from 'rxjs';
import { GridsterEmit } from 'src/app/interfaces/gridster-emit';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.sass']
})
export class PieChartComponent implements OnInit, AfterViewInit {
  @Input() widget: any;
  @Input() resizeEvent!: EventEmitter<GridsterEmit>;

  @ViewChild('chart') chartElement!: ElementRef;

  resizeSub!: Subscription;
  chart!: c3.ChartAPI;

  ngOnInit(): void {
    this.resizeSub = this.resizeEvent.subscribe(emitted => {
      if (emitted.item === this.widget) {
        if(this.chart){
          this.chart.resize({
            width: emitted.itemComponent.width,
            height: emitted.itemComponent.height
          });
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.chart = c3.generate({
      bindto: this.chartElement.nativeElement,
      data: {
        columns: [
          ['data1', 30],
          ['data2', 55],
          ['data3', 120],
        ],
        type: 'pie'
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeSub.unsubscribe();
  }
}
