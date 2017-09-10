import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';
import {PageService} from './page.service';

interface IClientData {
  name: string;
  gender: string;
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  phone: string;
  email: string;
  address: string;
  description: string;
}

const allowedParams = [
  'name',
  'gender',
  'birthYear',
  'birthMonth',
  'birthDay',
  'phone',
  'email',
  'address',
  'description'
];

@Injectable()
export class ApiService {

  private baseUrl = 'http://api.demo.lakmus.org/api/';

  constructor(private http: Http, private page: PageService) {
  }

  public getClient(id: number | string): Observable<any[]> {

    if (!id) {
      return Observable.throw(Error('wrong client id provided!'));
    }

    this.page.busyIndicator.onQuery();

    const url = `${this.baseUrl}clients/${id}`;
    return this.http.get(url).map((res): any[] => {
      this.page.busyIndicator.hide();
      return res.json();
    });

  } // end getClient

  public getClientList(params = {}): Observable<any[]> {

    this.page.busyIndicator.onQuery();

    const url = `${this.baseUrl}clients`;
    // console.log(`getClientList url:`, url);
    // console.log(`params:`, params);

    return this.http.get(url, {search: params}).map((res): any[] => {
      this.page.busyIndicator.hide();
      return res.json();
    });
  } // end getClientList

  public saveClient(clientData: IClientData) {

    this.page.busyIndicator.onProcess();

    const url = `${this.baseUrl}clients`;

    const body = new URLSearchParams();

    // put only allowed params
    allowedParams.forEach(key => {
      if (clientData.hasOwnProperty(key) && clientData[key] !== '') {
        body.set(key, clientData[key]);
      }
    });

    // handle date
    if (!!clientData['birthDate']) {
      const date = new Date(clientData['birthDate']);
      body.set('birthDay', date.getDay().toString());
      body.set('birthMonth', date.getMonth().toString());
      body.set('birthYear', date.getFullYear().toString());
    }

    const headers = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    });

    console.log(`body:`, body);
    // return Observable.throw('done');
    this.page.busyIndicator.onQuery();
    return this.http.post(url, body.toString(), {headers}).map( (res) => {
      this.page.busyIndicator.hide();
      return res;
    });
  }// end saveClient




  // this is wrong:
  public getClientsTotalCount() {
    const lastKnownLimit = 6404;
    const toInfinityAndBeyond = 9999;
    return this.getClientList({_start: lastKnownLimit, _limit: toInfinityAndBeyond})
      .toPromise().then(res => {
        const count = Object.keys(res).length || 0;
        return lastKnownLimit + count;
      });
  }
}
