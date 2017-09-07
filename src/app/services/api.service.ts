import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ApiService {

  private baseUrl = 'http://api.demo.lakmus.org/api/';

  constructor(private http: Http) {
  }

  public getClients(params = {}) {

    let queryParams = '';

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const val = params[key];
        if ( !!val ) {
          queryParams += `${key}=${val}`;
        }
      }
    }

    queryParams = ( queryParams !== '' ) ? '?' + queryParams : '';
    // const url = `${this.baseUrl}clients${queryParams}`;
    const url = `${this.baseUrl}clients`;

    console.log(`getClients url:`, url);
    return this.http.get(url, {search: params});
  }

}
