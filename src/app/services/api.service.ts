import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ApiService {

  private baseUrl = 'http://api.demo.lakmus.org/api/';

  constructor(private http: Http) {
  }

  public getClients(params = {}) {

    const url = `${this.baseUrl}clients`;

    console.log(`getClients url:`, url);
    console.log(`params:`, params);
    return this.http.get(url, {search: params});
  }

}
