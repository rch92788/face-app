import { Component, EventEmitter, Inject, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Session } from 'src/app/models/session.model';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/session.service';
import { MenuService } from '../menu.service'

@Component({
  selector: 'menu-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  hideAppBar: boolean = false;
  currentUser: any;
  subscription!: Subscription;
  
  loginButton_Text: string = 'Login';

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
    private sessionService: SessionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.sessionService.obs_SessionData.subscribe(sessionData => this.userLoggedIn(sessionData!));
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  userLoggedIn(sessionData: any): void {
    sessionData ??= this.sessionService.getSessionData();
    sessionData ??= this.authService.getTokenUser();
    if(this.authService.isLoggedIn() && sessionData!.user){
      sessionData!.user ??= this.sessionService.getSessionData()!.user;
      this.currentUser = sessionData!.user;
      this.loginButton_Text = 'Logout';
    } else {
      this.currentUser = null
      this.loginButton_Text = 'Login';
    }
  }

  loginClicked() {
    if(this.authService.isLoggedIn()){
      this.authService.logout();
    }
    this.router.navigate(['/', 'signin'])
      .then((_)=>{}, err => {
        console.log(err) // when there's an error
      });
  }

  toggleAppBarHide(){
    this.hideAppBar = !this.hideAppBar;
    if(this.hideAppBar){
      this.openFullscreen();
    } else {
      this.closeFullscreen();
    }
  }

  toggleMenuDrawer(){
    this.menuService.toggleMenuDrawer();
  }

  openFullscreen() {
    document.documentElement.requestFullscreen();
  }

  closeFullscreen() {
    document.exitFullscreen();
  }
}
