import {Injectable} from '@angular/core';
import {MdSnackBar} from '@angular/material';

class PageBusyIndicator {
  private _color: 'primary' | 'accent' | 'warn';
  private _mode: 'determinate' | 'indeterminate' | 'buffer' | 'query';
  private _isShow: boolean;

  public get color() {
    return this._color;
  }

  public get mode() {
    return this._mode;
  }

  public get isShow() {
    return this._isShow;
  }

  constructor() {
    this.hide();
  }

  public onQuery(): void {
    this._mode = 'query';
    this._color = 'accent';
    this._isShow = true;
  }

  public onProcess(): void {
    this._mode = 'indeterminate';
    this._color = 'primary';
    this._isShow = true;
  }

  public hide(): void {
    this._isShow = false;
  }
}


@Injectable()
export class PageService {

  public busyIndicator: PageBusyIndicator = new PageBusyIndicator();

  constructor(private _snackBar: MdSnackBar) {
  }

  public snackBar(message, action?, duration?) {
    const params = duration ? {duration} : null;
    this._snackBar.open(message, action, params);
  }

  public error(message) {
    this.busyIndicator.hide();
    this.snackBar(message, 'cancel');
  }
}
