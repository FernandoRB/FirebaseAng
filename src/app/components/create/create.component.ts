import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ClientsService } from 'src/app/services/clients.service';
import { FormControl, FormGroup } from '@angular/forms';
import Clients from 'src/app/interfaces/clients.interface';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  router: any;
  formulary: FormGroup;
  menuItems: any[] | undefined;
  clients: Clients[] | undefined;

  constructor(
    private clientService: ClientsService,
    private userService: UserService,
  ) {
    {
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
   }

  ngOnInit(): void {
    this.clientService.getService().subscribe(clients => {
      console.log(clients)
      this.clients = clients;
    })
  }


  //Login Service
  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }


  //Form Service
  async onSubmit() {
    console.log(this.formulary.value)
    const response = await this.clientService.addService(this.formulary.value);
    console.log(response);
    this.formulary.reset();
  }
}
