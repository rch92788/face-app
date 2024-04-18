import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GridsterEmit } from 'src/app/interfaces/gridster-emit';

@Component({
  selector: 'grid-table',
  templateUrl: './grid-table.component.html',
  styleUrls: ['./grid-table.component.sass']
})
export class GridTableComponent implements OnInit {
  @Input() widget: any;
  @Input() resizeEvent!: EventEmitter<GridsterEmit>;

  resizeSub!: Subscription;

  ngOnInit(): void {
    this.resizeSub = this.resizeEvent.subscribe(emitted => {
      if (emitted.item === this.widget) {
        // or check id , type or whatever you have there
        // resize your widget, chart, map , etc.
        console.log(emitted.item);
      }
    });
  }

  ngOnDestroy(): void {
    this.resizeSub.unsubscribe();
  }
}
