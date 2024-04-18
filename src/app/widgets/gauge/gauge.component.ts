import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import * as c3 from 'c3';
import { Subscription } from 'rxjs';
import { GridsterEmit } from 'src/app/interfaces/gridster-emit';

@Component({
  selector: 'gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.sass']
})
export class GaugeComponent implements OnInit, AfterViewInit {
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
            ['data', 91.4]
        ],
        type: 'gauge'
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeSub.unsubscribe();
  }
}
