import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {genderList} from '../shared';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function validateIsDate(control: FormControl) {
  return !(control.value instanceof Date) ? {'notDate': {valid: false}} : null;
}

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: 'client-details-dialog.component.html',
  styleUrls: ['client-details-dialog.component.scss']
})
export class ClientDetailsDialogComponent implements OnInit {

  public formControls: any;
  public genderList: any[] = genderList;
  public title: string;

  constructor(public dialogRef: MdDialogRef<ClientDetailsDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {

    this.title = this.data.dialogTitle;

    this.formControls = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'phone': new FormControl('', [
        Validators.required,
        Validators.pattern(/[0-9 +\-()]/),
        Validators.minLength(10)
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)
      ]),
      'birthDate': new FormControl(new Date('3/8/1990'), [
        validateIsDate,
        Validators.required
      ]),
      'address': new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      'gender': new FormControl('', [Validators.required])
    });
  }

}
