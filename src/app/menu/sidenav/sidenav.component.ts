import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { MenuService } from '../menu.service'

export interface Link {
  label: string;
  route: string;
}

@Component({
  selector: 'menu-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.sass']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') drawer!:MatSidenav;

  subscription!: Subscription;

  links: Link[] = [
    {
      label: 'My Dashboards',
      route:  'dashboards'
    },
    {
      label: 'Settings',
      route:  'settings'
    },
    {
      label: 'Support',
      route:  'support'
    },
  ];


  constructor(
    private menuService: MenuService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription = this.menuService.obs_MenuDrawer.subscribe(show => this.handleShowSideNav(show));
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleShowSideNav(show: boolean) {
    if(show) {
      this.drawer?.open();
    } else {
      this.drawer?.close();
    }
  }

  linkClicked(route: string) {
    this.router.navigate(['/', route])
      .then((_)=>{}, err => {
        console.log(err) // when there's an error
      });
  }

  // GUI Functions
  clickClose(){
    this.menuService.toggleMenuDrawer();
  }

}
