import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'app/core/api/auth/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import { DataValidationService } from 'app/core/helpers/data-validation.service';


@Component({
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})
export class RegisterComponent implements OnInit {

  credentials: FormGroup;

  //------------------------------------------------------------------------------//

  ngOnInit() {

    //initialize form
    this.formHandler();

  }

  //------------------------------------------------------------------------------//

  submit() {

    this.authService.register(this.credentials.value).subscribe(data => {
      this.flashMessage.show('Thank you, your account was created.', {
        cssClass: 'alert-success',
        timeout: 5000});
      this.router.navigate(['/users/login']);
    }, err=> {
      this.flashMessage.show('There was an error. Please try again.', {
        cssClass: 'alert-danger',
        timeout: 5000});
    });

  }

  //------------------------------------------------------------------------------//

  formHandler() {

    this.credentials = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]], //TODO: special characters
      email: ['', [Validators.required, Validators.email]],
      conf_email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]], //TODO: numbers etc.
      conf_password: ['', [Validators.required]]
    });
  }

  get name() { return this.credentials.get('name'); }
  get username() { return this.credentials.get('username'); }
  get email() { return this.credentials.get('email'); }
  get conf_email() { return this.credentials.get('conf_email'); }
  get password() { return this.credentials.get('password'); }
  get conf_password() { return this.credentials.get('conf_password'); }

  //------------------------------------------------------------------------------//

  conf_email_focus: boolean = false;
  isEmailConfirmed: boolean = false;
  compareEmails(): void {
      this.isEmailConfirmed = this.compare(this.email.value, this.conf_email.value);
  }

  //------------------------------------------------------------------------------//

  conf_password_focus: boolean = false;
  isPasswordConfirmed: boolean = false;
  comparePasswords(): void {
    console.log(this.password.value, this.conf_password.value)
    this.isPasswordConfirmed = this.compare(this.password.value, this.conf_password.value);
  }

  //------------------------------------------------------------------------------//

  compare(firstValue, secondValue): boolean {
    if(firstValue == null || secondValue == null) return false;
    return this.dataValidationService.isEqual(firstValue, secondValue);
  }

  //------------------------------------------------------------------------------//

  constructor(private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private flashMessage:FlashMessagesService,
              private dataValidationService: DataValidationService,
              private authService: AuthenticationService
  ) { }

}
