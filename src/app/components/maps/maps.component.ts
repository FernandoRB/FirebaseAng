import { Component, OnInit } from '@angular/core';
import { ClientsService } from 'src/app/services/clients.service';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
 
  pipe: DatePipe;

filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
});


  router: any;

  constructor(
    private clientService: ClientsService,
    private userService: UserService,
  ) {
    this.pipe = new DatePipe('en');
  }
  ngOnInit(): void {
  }
  //Login
  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }
}
