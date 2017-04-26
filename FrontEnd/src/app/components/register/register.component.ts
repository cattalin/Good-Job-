import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { AuthenticateService } from '../../services/authenticate.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  name = "";
  username = "";
  email = "";
  confEmail = "";
  password = "";
  confPassword = "";

  isTouched = {
    name : false,
    username : false,
    email : false,
    confEmail : false,
    password : false,
    confPassword : false
  }

  registerForm: FormGroup;
  isDataAvailable = false;
  user = null;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthenticateService,
    private router: Router,
    private rf: FormBuilder,
    private userProfileService: UserProfileService
  ) {

  }

  ngOnInit() {

    let nameRegex = '([a-z A-z\-]+)';
    this.registerForm = this.rf.group({
      name: [this.name, [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern(nameRegex)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.email]],
      c_email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]],
      c_pass: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]]
    });
    this.isDataAvailable = true;
  };

  //Validate Name
  isNameValid() {

    if (!/([a-z A-z\-]$)/.test(this.name)) return false;
    if (this.name.length < 4 || this.name.length > 25) return false;
    return true;
  }

  //Validate Username
  isUsernameValid() {
    if (this.username.length < 4 || this.username.length > 25) return false;
    return true;
  }

  // Validate Email
  isEmailValid() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.email);
  }

  //Check conf Email
  checkEmail() {

    if (this.email === this.confEmail) return true;
    return false;
  }

  //Validate Password
  isPasswordValid() {
    if (this.password.length < 5 || this.password.length > 15) return false;
    return true;
  }

  //Check conf Pass
  checkPassword() {
    if (this.password === this.confPassword) return true;
    return false;
  }

  // --------- Touched ----------

    setTouchedName() {

    if(!this.isTouched.name) {
      this.isTouched.name=true;
      return true;
    }
  }

  setTouchedUsername() {

    if(!this.isTouched.username) {
      this.isTouched.username=true;
      return true;
    }
  }

  setTouchedEmail() {

    if(!this.isTouched.email) {
      this.isTouched.email=true;
      return true;
    }
  }

  setTouchedConfEmail() {

    if(!this.isTouched.confEmail) {
      this.isTouched.confEmail=true;
      return true;
    }
  }

  setTouchedPassword() {

    if(!this.isTouched.password) {
      this.isTouched.password=true;
      return true;
    }
  }

  setTouchedConfPassword() {

    if(!this.isTouched.confPassword) {
      this.isTouched.confPassword=true;
      return true;
    }
  }

  onRegisterSubmit() {
    this.user = null;

    //get user by username
    this.userProfileService.getProfile(this.username).subscribe(data => {
      if (data) {
        // this.user = data.user;
        this.flashMessage.show('This username already exists.', { cssClass: 'alert-danger' });
        this.router.navigate(['/register']);
        return;
      }

      this.userProfileService.getProfileByEmail(this.email).subscribe(_data => {
        if (_data) {
          //this.user = data.user;
          this.flashMessage.show('This e-mail already exists.', { cssClass: 'alert-danger' });
          this.router.navigate(['/register']);
          return;
        }
        const user = {
          name: this.name,
          email: this.email,
          username: this.username,
          password: this.password,
          class: 'A'
        }

        // Register user
        this.authService.registerUser(user).subscribe(data => {
          if (data.success) {
            this.flashMessage.show('You are now registered and can log in', { cssClass: 'alert-success', timeout: 3000 });
            this.router.navigate(['/login']);
          } else {
            this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
            this.router.navigate(['/register']);
          }
        });
      },
        err => { });
    },
      err => { });
  }

}
