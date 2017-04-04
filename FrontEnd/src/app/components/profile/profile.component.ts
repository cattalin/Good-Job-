import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { ValidateService } from '../../services/validate.service';
import { Router } from '@angular/router';
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: Object;

  editName = false;
  editEmail = false;
  editPassword = false;

  nameForm: FormGroup;


  //-----------------------------------------------------------------------------------------------//

  constructor(private authService: AuthenticateService, private router: Router, private nf: FormBuilder, //
    private flashMessage: FlashMessagesService) {

    this.nameForm = this.nf.group({
      name: ['', [Validators.minLength(4), Validators.maxLength(25)]]
    });

  };

  ngOnInit() {
    this.authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log(this.user);
    },
      err => {
        console.log(err);
        return false;
      });

  };

  //POSTS
  //-----------------------------------------------------------------------------------------------//

  saveName() {

    console.log(this.user);

    this.authService.updateUser(this.user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Profile updated sucessfuly.', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/profile']);
      } else {
        this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/profile']);
      }
    });

    //turn off edit mode
    this.editName = false;
  }

  //Utils
  //-----------------------------------------------------------------------------------------------//
  isEmailConfirmed(newEmail, confirmedEmail) {
    if (newEmail === confirmedEmail) return true;
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
    else this.editEmail = true;

  }

  togglePassword() {
    if (this.editPassword === true)
      this.editPassword = false;
    else this.editPassword = true;
  }
}