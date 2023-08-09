import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ClientsService } from 'src/app/services/clients.service';
import { FormControl, FormGroup } from '@angular/forms';
import Clients from 'src/app/interfaces/clients.interface';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import { query, where } from '@angular/fire/firestore';


let timeRef = new Date();
timeRef.getFullYear(); 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})



export class DashboardComponent implements OnDestroy, OnInit {
  today: number = Date.now();


  //date
  CurrentTime:any;
  dtOptions: DataTables.Settings = {};
  //Order Opt
  //Pagination
  title = 'pagination';
  POSTS: any;
  page:number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [5, 10, 15, 20];
  router: any;
  formulary: FormGroup;
  menuItems: any[] | undefined;
  clients: Clients[] | undefined;
  filter = '';
  posts = [
    {
      id: 1,
      titulo: "Post Uno",
      fecha: "02/04/2019"
    },
    {
      id: 2,
      titulo: "Post Dos",
      fecha: "11/04/2019"
    },
    {
      id: 3,
      titulo: "Post Tres",
      fecha: "30/01/2019"
    },
    {
      id: 4,
      titulo: "Post Cuatro",
      fecha: "30/05/2019"
    },
    {
      id: 5,
      titulo: "Post Cinco",
      fecha: "30/04/2019"
    }
  ];
  //Datatable 
  

  
  hoy = new Date();
 
  // dtTrigger = new Subject<any>();
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;




  constructor(
   
    //Pagination
    private UsersService:UsersService,     
    //DB
    private clientService: ClientsService,
    private userService: UserService,
    //Datatable
    private httpClient: HttpClient
  ) {
    this.formulary = new FormGroup({
      date: new FormControl(),
      name: new FormControl(),
      identificator: new FormControl(),
      contact: new FormControl(),
      fon: new FormControl(),
      direction: new FormControl(),
      commune: new FormControl(),
      system: new FormControl(),
      service: new FormControl(),
    })
  }
  ngOnInit(): void {
    this.clientService.getService().subscribe(clients => {
      console.log(clients)
      this.clients = clients;
      //Pagination
      this.postList();
    })

    //Datatable Start
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2
    };

    this.CurrentTime = '';
    
    // let timeRef = Date.now().toString()
    // console.log(timeRef)
    // let timeRef = new Date();
    // timeRef.getFullYear();    
    // console.log(timeRef); 
    // timeRef.setFullYear(2020);
    // console.log(timeRef); 
    // const q = query(citiesRef, where("state", "==", "CA"));
  }


 
  // compareDates() {
  //   if (this.date1.getTime() < this.currentDate.getTime()) {
  //     console.log("date1 is before current date");
  //   }
  //   if (this.date1.getTime() > this.currentDate.getTime()) {
  //     console.log("date1 is after current date");
  //   }
  // }


  postList():void{
    this.UsersService.getAllPosts().subscribe((response) =>{
      this.posts = response;
      console.log(this.posts);
    })
  }

  onTableDataChange(event:any){
    this.page = event;
    this.postList();

  }
  onTableSizeChange(event:any): void{
    this.tableSize = event.target.value;
    this.page = 1;
    this.postList();
  }
  //Login
  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }
  //Datatable
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
      }

}
