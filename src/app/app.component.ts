import {Component} from '@angular/core';
import {PageService} from './services/page.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'App works!';

  constructor(public  page: PageService){}
}
