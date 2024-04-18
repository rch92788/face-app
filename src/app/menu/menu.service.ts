import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService { //} implements OnInit {

  private bool_MenuDrawer = new BehaviorSubject<boolean>(false);
  obs_MenuDrawer: Observable<boolean> = this.bool_MenuDrawer.asObservable();

  constructor(private http: HttpClient) { }

  // ngOnInit(): void {
  //   this.http.post('http://localhost:3000/users/login', reqObject, { headers: headers }).subscribe({
      
  //     next: (response) => {
  //       console.log(response);
  //       // If the user authenticates successfully, we need to store the JWT returned in localStorage
  //       this.authService.setLocalStorage(response);

  //     },

  //     error: (response) => {
  //       if(!response.error.success){
  //         this.postFail = true;
  //         this.postError = response.error.msg;
  //       }
  //     },
      
  //     // When observable completes
  //     complete: () => {
  //       console.log('done!');
  //       this.router.navigate(['dashboard']);
  //     }

  //   });
  // }

  toggleMenuDrawer(){
    this.bool_MenuDrawer.next( !this.bool_MenuDrawer.getValue() );
  }
}
