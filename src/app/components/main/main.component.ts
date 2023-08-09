import { Component, OnInit } from '@angular/core';
import { ROUTES } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTESM: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
  { path: 'dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },


  { path: '/Create', title: 'Create',  icon:'person', class: '' },
  { path: '/Chat', title: 'Chat',  icon:'content_paste', class: '' },
  { path: '/Calendar', title: 'Calendar',  icon:'library_books', class: '' },
  { path: '/Maps', title: 'Maps',  icon:'bubble_chart', class: '' },
  { path: '/Analytics', title: 'Analytics',  icon:'location_on', class: '' },
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  menuItems: any[] | undefined;
  router: any;

  constructor(
    private userService: UserService,
    
  ) { }

  ngOnInit(): void {
    this.menuItems = ROUTESM.filter(menuItem => menuItem);

  }

  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }

  

}
