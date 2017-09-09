import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import {isNumber} from 'util';

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

  constructor(private http: Http) {
  }

  public getClient(id: number | string): Observable<any[]> {

    if (!id) {
      return Observable.throw(Error('wrong client id provided!'));
    }

    const url = `${this.baseUrl}clients/${id}`;
    return this.http.get(url).map((res): any[] => res.json());

  }

  public getClients(params = {}): Observable<any[]> {

    const url = `${this.baseUrl}clients`;
    // console.log(`getClients url:`, url);
    // console.log(`params:`, params);

    return this.http.get(url, {search: params}).map((res): any[] => res.json());
  }

  public addClient(clientData: IClientData) {

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
    return this.http.post(url, body.toString(), {headers});
  }
}
