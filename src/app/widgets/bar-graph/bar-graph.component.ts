import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import * as c3 from 'c3';
import { Subscription } from 'rxjs';
import { GridsterEmit } from 'src/app/interfaces/gridster-emit';

@Component({
  selector: 'bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.sass']
})
export class BarGraphComponent implements OnInit, AfterViewInit {
  @Input() widget!: GridsterItem;
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
          ['data2', 130, 100, 140, 200, 150, 50]
        ],
        type: 'bar'
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeSub.unsubscribe();
  }

  editClicked(): void {
    console.log('Edit clicked - Widget: ' + this.widget);
  }

}
