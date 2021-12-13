import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '@demo-repo/shared/core-api';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-repo-client-edit-form',
  templateUrl: './client-edit-form.component.html',
  styleUrls: ['./client-edit-form.component.scss'],
})
export class ClientEditFormComponent implements OnInit {
  clientDetails = {
    name: '',
    gender: '',
    DOB: '',
    iban: '',
    email: '',
    houseno: '',
    add: '',
    postcode: '',
    city: '',
    country: '',
  };
  clientForm!: FormGroup;

  constructor(
    private service: ClientService,
    private route: Router
  ) {
    this.clientForm = new FormGroup({
      name: new FormControl(this.clientDetails.name, [Validators.required]),
      DOB: new FormControl(this.clientDetails.DOB, [Validators.required]),
      iban: new FormControl(this.clientDetails.iban, {
        validators: [Validators.required /*, ibanValidator(service)*/],
        updateOn: 'blur',
      }),
      email: new FormControl(this.clientDetails.email, {
        validators: [
          Validators.required,
          checkEmailPattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/),
        ],
        updateOn: 'blur',
      }),
      houseno: new FormControl(this.clientDetails.houseno, [
        Validators.required,
      ]),
      add: new FormControl(this.clientDetails.add, [Validators.required]),
      postcode: new FormControl(this.clientDetails.postcode, {
        validators: [
          Validators.required,
          checkPostcodePattern(/^[0-9]{4}[a-zA-Z]{2}$/),
        ],
        updateOn: 'blur',
      }),
      city: new FormControl(this.clientDetails.city, [Validators.required]),
      country: new FormControl(this.clientDetails.country, [
        Validators.required,
      ]),
      gender: new FormControl(this.clientDetails.gender, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.service.clientData$.subscribe(r => {
      this.updateForm(r)  
    })
  }

  updateForm(editDetails: any) {
    this.clientForm.controls['name'].setValue(editDetails.name)
    this.clientForm.controls['email'].setValue(editDetails.email)
    this.clientForm.controls['city'].setValue(editDetails.city)
    this.clientForm.controls['iban'].setValue(editDetails.iban)
    this.clientForm.controls['postcode'].setValue(editDetails.postCode)
    this.clientForm.controls['houseno'].setValue(editDetails.houseNr)
    this.clientForm.controls['add'].setValue(editDetails.addition)
    let formattedDate=this.formatDate(editDetails.birthDate)
    this.clientForm.controls['DOB'].setValue(formattedDate)
    this.clientForm.controls['gender'].setValue(editDetails.gender)
    this.clientForm.controls['country'].setValue(editDetails.country)
  }

  formatDate(birthDate:string){
    //convert dd/mm/yyyy to mm/dd/yyyy
    const dt = birthDate.split('/');
    const replacedDt = `${dt[1]}/${dt[0]}/${dt[2]}`;

    let date=new Date(replacedDt);
    var year = date.getFullYear();

    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    console.log((new Date(month + '/' + day + '/' + year)));
    return new Date(month + '/' + day + '/' + year).toISOString().substring(0, 10);
    
  }

  todaysDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    return `${year}-${month < 10 ? '0' : ''}${month}-${
      date < 10 ? '0' : ''
    }${date}`;
  }

  formSubmit(){
    alert("Form submitted!!")
  }

  navigateToList() {
    this.route.navigate(['client-list'])
  }
}

function checkEmailPattern(checkPattern: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validPattern = checkPattern.test(control.value);
    return validPattern ? null : { email: { value: control.value } };
  };
}
function checkPostcodePattern(checkPattern: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const validPattern = checkPattern.test(control.value);
    return validPattern ? null : { postcode: { value: control.value } };
  };
}
function ibanValidator(service: ClientService): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return service.ibanApi(control.value);
  };
}
