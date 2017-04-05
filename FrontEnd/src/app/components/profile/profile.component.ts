import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: any;

  newName: String;
  newEmail: String;
  confEmail: String;

  editName = false;
  editEmail = false;
  editPassword = false;

  nameForm: FormGroup;
  emailForm: FormGroup;

  //-----------------------------------------------------------------------------------------------//

  constructor(private authService: AuthenticateService, private router: Router, private nf: FormBuilder,
    private ef: FormBuilder, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;

      let nameRegex = '([a-z A-z\-]+)';

      this.nameForm = this.nf.group({
        name: [this.user.name, [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern(nameRegex)]]
      });

      this.emailForm = this.ef.group({
        n_email: [this.user.email, [Validators.required, Validators.email]],
        c_email: ['']
      });

    },
      err => {
        console.log(err);
        return false;
      });
  };

  //POSTS
  //-----------------------------------------------------------------------------------------------//

  updateUserName() {
    const toSend =
      { _id: this.user._id, name: this.newName }
    this.authService.updateUserName(toSend).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Name updated sucessfuly. Please refresh.', { cssClass: 'alert-success', timeout: 3000 });
        this.user.name = this.newName;
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });

    this.editName = false;
  }

  updateUserEmail() {

    this.authService.updateUserEmail({ _id: this.user._id, email: this.newEmail }).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Email updated sucessfuly. Please refresh.', { cssClass: 'alert-success', timeout: 3000 });
        this.user.email = this.newEmail;
      }
      else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });
    this.editEmail = false;
  }

  //Utils
  //-----------------------------------------------------------------------------------------------//

  checkEmail() {
    if (this.newEmail === this.confEmail) return true;
    return false;
  }

  isValidNameForm() {
    return this.nameForm.valid;
  }

  //Toggles
  //-----------------------------------------------------------------------------------------------//

  toggleName() {
    if (this.editName === true)
      this.editName = false;
    else this.editName = true;
  }

  toggleEmail() {
    if (this.editEmail === true)
      this.editEmail = false;
    else
      this.editEmail = true;
  }

  togglePassword() {
    if (this.editPassword === true)
      this.editPassword = false;
    else this.editPassword = true;
  }
}