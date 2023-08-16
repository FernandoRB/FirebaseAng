import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ClientsService } from 'src/app/services/clients.service';
import { FormControl, FormGroup } from '@angular/forms';
import Clients from 'src/app/interfaces/clients.interface';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

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
  // dtTrigger = new Subject<any>();
  dtTrigger: Subject<any> = new Subject<any>();
  data: any;

  datepicker:any;
  querys: any;
  db: any;


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
  async ngOnInit(): Promise<void> {
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


    //Calendar Setting
    $('.dateadded').on( 'change', function (ret :any) {
 
      let v = ret.target.value  
      
      $('#dataTables-example').DataTable().columns(3).search(v).draw();
  } );
  }
  
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


  async onClickDelete(clients: Clients) {
    const response = await this.clientService.deleteService(clients);
    console.log(response);
  }
  



  //Datatable
  ngOnDestroy(): void {
        this.dtTrigger.unsubscribe();
          }
}

// .collection("clients")
// .orderBy("date", "asc")