import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import * as c3 from 'c3';
import { Subscription } from 'rxjs';
import { GridsterEmit } from 'src/app/interfaces/gridster-emit';

@Component({
  selector: 'line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.sass']
})
export class LineChartComponent implements OnInit, AfterViewInit {
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
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeSub.unsubscribe();
  }
}
