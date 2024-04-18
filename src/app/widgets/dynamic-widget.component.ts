import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dynamic-widget',
  templateUrl: './dynamic-widget.component.html',
  styleUrls: ['./dynamic-widget.component.sass']
})
export class DynamicWidgetComponent {
  @Input() widget: any;
  @Input() resizeEvent: any;
}
