import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserProfileService } from '../../services/user-profile.service';

import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  private q = {
  sort:   '_id',
  select: null,
  limit:  1000,
  skip:   0,
  };

  user: any;
  followers: Number;
  following: any;

  newName: String;
  newEmail: String;
  confEmail: String;
  oldPassword: String;
  newPassword: String;
  confPassword: String;

  editName = false;
  editEmail = false;
  editPassword = false;
  showFollowings=false;

  nameForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;

  //-----------------------------------------------------------------------------------------------//

  constructor(private authService: AuthenticateService,
    private router: Router, private nf: FormBuilder,
    private ef: FormBuilder, private pf: FormBuilder,
    private flashMessage: FlashMessagesService,
    private userProfileService: UserProfileService) { }

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;

      this.userProfileService.getNumberOfFollowers(this.user._id).subscribe(followers => {
        this.followers=followers.count;

          this.userProfileService.getListOfFollowings(this.user._id).subscribe(following => {
            this.following=following;

      let nameRegex = '([a-z A-z\-]+)';

      this.nameForm = this.nf.group({
        name: [this.user.name, [Validators.required, Validators.minLength(4), Validators.maxLength(25), Validators.pattern(nameRegex)]]
      });

      this.emailForm = this.ef.group({
        n_email: [this.user.email, [Validators.required, Validators.email]],
        c_email: ['']
      });

      this.passwordForm = this.pf.group({
        o_pass: [''],
        n_pass: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]],
        c_pass: ['']
      });
    })
    })
    },
      err => {
        console.log(err);
        return false;
      });
  };

  //POSTS
  //-----------------------------------------------------------------------------------------------//

  updateUserName() {

    this.authService.updateUserName({ _id: this.user._id, name: this.newName }).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Name updated sucessfuly.', { cssClass: 'alert-success', timeout: 3000 });
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
        this.flashMessage.show('Email updated sucessfuly.', { cssClass: 'alert-success', timeout: 3000 });
        this.user.email = this.newEmail;
      }
      else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });

    this.editEmail = false;
  }

  updateUserPassword() {

    this.authService.updateUserPassword({ _id: this.user._id, oldPassword: this.oldPassword, password: this.newPassword }).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Password updated sucessfuly.', { cssClass: 'alert-success', timeout: 3000 });
      }
      else {
        this.flashMessage.show('The old password does not match', { cssClass: 'alert-danger', timeout: 3000 });
      }
    });

    this.editPassword = false;
  }

  //Utils
  //-----------------------------------------------------------------------------------------------//

  checkPassword() {
    if (this.newPassword === this.confPassword) return true;
    return false;
  }

  checkEmail() {
    if (this.newEmail === this.confEmail) return true;
    return false;
  }

  isValidNameForm() {
    return this.nameForm.valid;
  }

  showFollowingVideos(){
    this.showFollowings=true;
  }

  //Toggles
  //-----------------------------------------------------------------------------------------------//

  cancel() {

    this.newName = "";
    this.newEmail = "";
    this.confEmail = "";
    this.oldPassword = "";
    this.newPassword = "";
    this.confPassword = "";

    this.editName = false;
    this.editEmail = false;
    this.editPassword = false;
  }

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
    else
      this.editPassword = true;
  }
}