import {MdDialogRef} from '@angular/material';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {genderList} from '../../constants';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: 'add-client-dialog.html',
  styles: [`
    .client-data-form {
      display: flex;
      flex-direction: column;
    }

    md-form-field {
      /*width: auto;*/
      min-width: 320px;
    }
    
  `]
})
export class AddClientDialogComponent implements OnInit {

  public formControls: any;
  public genderList: any[] = genderList;

  constructor(public dialogRef: MdDialogRef<AddClientDialogComponent>) {
  }

  ngOnInit() {

    this.formControls = new FormGroup({
      'name': new FormControl('', [
        Validators.required,
        Validators.minLength(4)
      ]),
      'phone': new FormControl('', [
        Validators.pattern(/[0-9 +\-()]/),
        Validators.minLength(10)
      ]),
      'email': new FormControl('', [Validators.pattern(EMAIL_REGEX)]),
      'birthDate': new FormControl(null, [Validators.pattern(/\d{1,2}\/\d{1,2}\/\d{4}/)]),
      'address': new FormControl('', [
        Validators.minLength(3),
        Validators.pattern(/[a-zA-Z0-9 -.,]/),
      ]),
      'gender': new FormControl('')
    });
  }

  log(form) {
    console.log(`form:`, form);
  }

}
