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
import {MdDialog} from '@angular/material';
import {AddClientDialogComponent} from './add-client-dialog/add-client-dialog.component';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['name', 'phone', 'email', 'birth', 'address'];
  @ViewChild('filter') filter: ElementRef;
  @ViewChild('genderSelect') genderSelect: ElementRef;

  public dataSource: ExampleDataSource;
  public genderList: any[] = [
    {value: ''},
    {value: 'female'},
    {value: 'male'}
  ];
  public selectedGender: string;

  constructor(private api: ApiService, public dialog: MdDialog) {
    this.dataSource = new ExampleDataSource(api);
  }

  ngOnInit() {

    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(1000)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.name = this.filter.nativeElement.value;
      });

    // this.api.getClients().subscribe(res => {
    //   console.log(`res:`, res);
    // });

  }

  public onGenderChange(event) {
    // console.log(`$event:`, event);
    this.dataSource.gender = event.value;

  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      width: '250px',
      data: {genderList: this.genderList}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. result: ', result);
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


  constructor(private api: ApiService) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<any> {

    return Observable.merge(this._nameChange, this._genderChange)
      .debounceTime(300)
      .flatMap(() => {
        console.log(`merge:`);
        return this.api.getClients({'name': this.name}).map(res => {
          console.log(`res:`, res);
          let clients: any[] = res.json();
          if (this.gender !== '' && clients.length) {
            clients = clients.filter(client => client.gender === this.gender);
          }
          return clients;
        });
      });
  }


  disconnect() {
  }
}
