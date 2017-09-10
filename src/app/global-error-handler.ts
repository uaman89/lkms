import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {PageService} from 'app/services/page.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor( private injector: Injector) {
  }

  handleError(error) {
    console.log('Hio');
    const page = <PageService>this.injector.get(PageService);

    setTimeout(() => {
      page.error('Error: ' + error);
    });

    console.log('Hio');

    // IMPORTANT: Rethrow the error otherwise it gets swallowed
    // throw error;
  }

}
