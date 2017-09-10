import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MdDialog} from '@angular/material';
import {ApiService} from 'app/services/api.service';
import {IClientData} from 'app/shared';
import {ClientDetailsDialogComponent} from 'app/client-details-dialog/client-details-dialog.component';

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
        console.log(`client:`, clientData);

        this.client = {
          'id': clientData.id,
          'name': clientData.name,
          'cardNumber': clientData.cardNumber,
          'gender': clientData.gender,
          'birthMonth': clientData.birthMonth,
          'birthDay': clientData.birthDay,
          'birthYear': clientData.birthYear,
          'phone': clientData.phone,
          'email': clientData.email,
          'address': clientData.address,
        };

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
        this.api.saveClient(newClientData).subscribe(
          res => {
            console.log(`post res:`, res);
          },
          // error => {
          //   console.log(`error:`, error);
          // }
        );
      }
    });
  }

}
