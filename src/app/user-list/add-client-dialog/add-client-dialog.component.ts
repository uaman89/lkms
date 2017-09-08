import {MD_DIALOG_DATA, MdDialogRef} from '@angular/material';
import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

interface ClientData {
  name: string;
  phone: string;
  email: string;
  birthDate: string;
  address: string;
  gender: string;
}

@Component({
  selector: 'app-add-client-dialog',
  templateUrl: 'add-client-dialog.html',
})
export class AddClientDialogComponent implements OnInit {

  public client: ClientData = <ClientData>{};

  public formControls: any;

  constructor(public dialogRef: MdDialogRef<AddClientDialogComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {

    this.formControls = {
      'name': new FormControl(this.client.name, [
        Validators.required,
        Validators.minLength(4),
        // forbiddenNameValidator(/bob/i) // <-- Here's how you pass in the custom validator.
      ]),
      'phone': new FormControl(this.client.phone, [Validators.pattern(/[0-9 +\-]/)]),
      'email': new FormControl(this.client.email, [Validators.email]),
      'birthDate': new FormControl(this.client.birthDate, [Validators.pattern(/\d{2}\/\d{2}\/\d{4}/)]),
      'address': new FormControl(this.client.birthDate, [
        Validators.minLength(3),
        Validators.pattern(/[a-zA-Z0-9 -.,]/),
      ]),
      'gender': new FormControl(this.client.phone, [Validators.pattern(/'male'|'female'/i)]),
    };
  }

  log(form) {
    console.log(`form:`, form);
  }

}
