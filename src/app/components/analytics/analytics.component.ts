import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css']
})
export class AnalyticsComponent implements OnInit {
  router: any;

  constructor(
    private clientService: ClientsService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {}
  
  //Login Service
  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }
}
