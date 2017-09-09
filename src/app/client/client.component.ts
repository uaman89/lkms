import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ClientDetailsDialogComponent} from '../client-details-dialog/add-client-dialog.component';
import {MdDialog} from '@angular/material';
import {ApiService} from '../services/api.service';

interface IClientData {
  'id': number;
  'name': string;
  'cardNumber': number;
  'gender': string;
  'birthDay': any;
  'birthMonth': any;
  'birthYear': any;
  'phone': string;
  'email': string;
  'address': string;
}

@Component({
  selector: 'app-user',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class UserComponent implements OnInit {

  public client: IClientData = <IClientData>{};

  constructor(private route: ActivatedRoute, private api: ApiService, public dialog: MdDialog) {
  }


  ngOnInit() {
    this.route.data.subscribe(({data: clientData}) => {
        // document.querySelector('app-user').innerHTML = JSON.stringify(data);
        console.log(`client:`, clientData);

        this.client = {
          'id': clientData.id,
          'name': clientData.name,
          'cardNumber': clientData.cardNumber,
          'gender': clientData.gender,
          'birthMonth': clientData.birthMonth,
          'birthDay': clientData.birthDa,
          'birthYear': clientData.birthYear,
          'phone': clientData.phone,
          'email': clientData.email,
          'address': clientData.address,
        };

        for (const key in this.client) {
          if (this.client.hasOwnProperty(key)) {
            if (!this.client[key]) {
              this.client[key] = 'Unknown';
            }
          }
        }
      }
    );
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ClientDetailsDialogComponent, {
      // width: '250px',
      data: {dialogTitle: 'Edit client', clientData: this.client}
    });

    dialogRef.afterClosed().subscribe(newClientData => {
      console.log('The dialog was closed. result: ', newClientData);
      if (!!newClientData) {
        this.api.addClient(newClientData).subscribe(res => {
          console.log(`post res:`, res);
        });
      }
    });
  }


}

