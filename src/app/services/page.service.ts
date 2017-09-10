import {Injectable} from '@angular/core';

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
    this._mode = 'indeterminate';
    this._color = 'primary';
    this._isShow = false;

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

  constructor() {
  }

}
