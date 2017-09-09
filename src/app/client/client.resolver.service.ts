import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {ApiService} from 'app/services/api.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ClientDetailResolver implements Resolve<any> {
  constructor(private api: ApiService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ClientData> {
    const id = route.paramMap.get('id');

    return this.api.getClient(id);
  }
}
