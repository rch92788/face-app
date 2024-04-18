import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

const MAX_WIDTH: number = 12;
const MAX_HEIGHT: number = 14;

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass',]
})
export class DashboardComponent implements OnInit {

  // private items: GridStackWidget[] = [
  //   {x: 0, y: 0, w: MAX_WIDTH/2, h: MAX_HEIGHT/2, content: '1'},
  //   {x: MAX_WIDTH/2, y: 0, w: MAX_WIDTH/2, h: MAX_HEIGHT/2, content: '2'},
  //   {x: 0, y: MAX_HEIGHT/2, w: MAX_WIDTH/2, h: MAX_HEIGHT/2, content: '3'},
  //   {x: MAX_WIDTH/2, y: MAX_HEIGHT/2, w: MAX_WIDTH/2, h: MAX_HEIGHT/2, content: '4'},
  // ];

  // private grid!: GridStack;

  constructor(
    private http: HttpClient
  ) { }

  isAuth = false;

  ngOnInit(): void {
    this.http.get<any>('http://localhost:3000/users/protected').subscribe({
      next: (response) => {
        this.isAuth = true;
        setTimeout(() => this.loadGrid(), 1000);
      },

      error: (response) => {
        // console.log(response);
      }
    });
  }

  public loadGrid(): void {
    // this.grid = GridStack.init({
    //   cellHeight: '7vh',
    //   acceptWidgets: true,
    //   dragIn: '.newWidget',  // class that can be dragged from outside
    //   dragInOptions: { revert: 'invalid', scroll: false, appendTo: 'body', helper: 'clone' }, // clone or can be your function
    //   removable: '#trash', // drag-out delete class
    // })
    // .load(this.items);
  }

  // public add() {
  //   this.grid.addWidget({w: 3, content: 'new content'});
  // }

  // public delete() {
  //   this.grid.removeWidget(this.grid.engine.nodes[0].el!);
  // }

  // public change() {
  //   this.grid.update(this.grid.engine.nodes[0].el!, {w: 1});
  // }

}