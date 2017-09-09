import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ApiService} from '../services/api.service';
import {Observable} from 'rxjs/Observable';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/mergeMap';
import {MdDialog, MdPaginator} from '@angular/material';
import {ClientDetailsDialogComponent} from '../client-details-dialog/client-details-dialog.component';
import {genderList} from '../shared';

@Component({
  selector: 'app-user-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class UserListComponent implements OnInit {



  public dataSource: ExampleDataSource;
  public genderList: any[] = genderList;
  public selectedGender: string;

  public clientsTotalCount = 50;
  public displayedColumns = ['name', 'phone', 'email', 'birth', 'address'];

  @ViewChild('filter') filter: ElementRef;
  @ViewChild('genderSelect') genderSelect: ElementRef;
  @ViewChild(MdPaginator) paginator: MdPaginator;

  constructor(private api: ApiService, public dialog: MdDialog) {
  }

  ngOnInit() {

    this.api.getClientsTotalCount().then(count => {
      this.clientsTotalCount = count;
      console.log(`count:`, count);
    });


    this.dataSource = new ExampleDataSource(this.api, this.paginator);

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.name = this.filter.nativeElement.value;
      });

  }

  public onGenderChange(event) {
    // console.log(`$event:`, event);
    this.dataSource.gender = event.value;

  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ClientDetailsDialogComponent, {
      // width: '250px',
      data: {dialogTitle: 'Add new client'}
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


export class ExampleDataSource extends DataSource<any> {

  private _nameChange = new BehaviorSubject('');

  get name(): string {
    return this._nameChange.value;
  }

  set name(newValue: string) {
    console.log(`name!`);
    this._nameChange.next(newValue);
  }

  private _genderChange = new BehaviorSubject('');

  get gender(): string {
    return this._genderChange.value;
  }

  set gender(newValue: string) {
    console.log(`gender!`);
    this._genderChange.next(newValue);
  }

  constructor(private api: ApiService, private _paginator: MdPaginator) {
    super();

  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {

    const displayDataChanges = [
      this._nameChange,
      this._genderChange,
      this._paginator.page
    ];

    return Observable.merge(...displayDataChanges)
      .debounceTime(300)
      .flatMap(() => {
        console.log(`merge:`);
        const _start = this._paginator.pageIndex * this._paginator.pageSize;
        const _limit = _start + this._paginator.pageSize;
        const searchParams = {
          name: this.name,
          _start,
          _limit
        };

        return this.api.getClients(searchParams).map((clients: any[]) => {

          console.log(`clients:`, clients);

          // filter by gender
          if (this.gender !== '' && clients.length) {
            console.log(`this.gender:`, this.gender);
            clients = clients.filter(client => {
              console.log(`client.gender:`, client.gender);
              return client.gender === this.gender;
            });
          }

          return clients;
        });
      });
  }


  disconnect() {
  }
}
