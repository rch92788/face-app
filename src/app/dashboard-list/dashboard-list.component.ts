import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface Dashboard {
  name: string;
  description: string;
  category: string;
  imgsrc: any;
  id: number;
}

@Component({
  selector: 'dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.sass']
})
export class DashboardListComponent implements OnInit {

  // This is merely for testing
  dashboards: Dashboard[] = [
    {
      name: 'Unit Flow',
      description:  'This is just a test description',
      category: 'Performance',
      imgsrc: null,
      id: 341234124
    },
    {
      name: 'Sterilizer',
      description:  'This is just a test description',
      category: 'Quality',
      imgsrc: null,
      id: 234213423
    },
    {
      name: 'Operation Performance',
      description:  'This is just a test description',
      category: 'Availability',
      imgsrc: null,
      id: 234234214
    },
    {
      name: 'Assembly Status',
      description:  'This is just a test description',
      category: 'Performance',
      imgsrc: null,
      id: 234234214
    },
    {
      name: 'Tester1 Dashboard',
      description:  'This is just a test description',
      category: 'Quality',
      imgsrc: null,
      id: 234324214
    },
    {
      name: 'Tester2 Dashboard',
      description:  'This is just a test description',
      category: 'Operations',
      imgsrc: null,
      id: 980349543
    },
    {
      name: 'Tester3 Dashboard',
      description:  'This is just a test description',
      category: 'Global',
      imgsrc: null,
      id: 987594389
    },
  ];

  public gridColumns = 5;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setNumberOfColumns();
  }

  @HostListener('window:resize', ['$event'])

  resizeWindow() {
    this.setNumberOfColumns();
  }

  setNumberOfColumns(): void {
    this.gridColumns = 
    (window.innerWidth < 500) ? 1 :
    (window.innerWidth < 700) ? 2 :
    (window.innerWidth < 1000) ? 3 : 5;
  }

  createNew_clicked(): void {
    this.router.navigate(['/', 'editor'])
      .then((_)=>{}, err => {
        console.log(err) // when there's an error
      });
  }

  goToDashboard(): void {
    console.log('Not yet implemented!');
  }

}
