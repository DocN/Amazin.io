import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import { auth } from 'firebase';
import { FireauthServiceService } from '../fireauth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FireauthServiceService } from '../fireauth-service.service';

@Component({
  selector: 'app-login-portal',
  templateUrl: './login-portal.component.html',
  styleUrls: ['./login-portal.component.scss'],
  exportAs: 'child'
})
export class LoginPortalComponent implements OnInit {

  @ViewChild('basicModal') public autoShownModal:ModalDirective;
  private userData;
  private loginSignup;
  //storing credentials
  private signupModel: any = {};
  private loginModel: any = {};

  private errorMsg;
  private signupPasswordValid;
  private signupPasswordLength;

  constructor(private session:FireauthServiceService, private spinner: NgxSpinnerService) { 
    this.session.afAuth.user.subscribe(
      (data) => {
        this.userData = data;
        if(this.userData != null) {
          this.closeModal();
        }
      }
    )
  }

  ngOnInit() {
    this.loginSignup = true;
    this.signupPasswordValid = true;
    this.signupPasswordLength = true;
  }

  openLoginModal() {
    this.loginSignup = true;
    this.autoShownModal.show();
  }

  openSignupModal() {
    this.loginSignup = false;
    this.autoShownModal.show();
  }

  closeModal() {
    this.autoShownModal.hide();
  }

  loginGoogle() {
    this.session.loginGoogle();
  }

  logout() {
    this.session.afAuth.auth.signOut();
  }

  checkLoginStatus() {
    console.log();
  }

  //signup account
  signupButton() {
    if(!this.validateSignup()) {
      if(this.signupPasswordLength == false) {
        this.errorMsg = "Invalid password length, please make sure your password is at least 6 characters";
      }
      else if(this.signupPasswordValid == false) {
        this.errorMsg = "Retyped password does not match the original password";
      }
      else {
        this.errorMsg = "";
      }
    }
    else {
      this.session.signup(this.signupModel.sEmail, this.signupModel.rPassword, this.signupModel.firstname, this.signupModel.lastname);
      this.clearFields();
    }
  }

  clearFields() {
    this.signupModel.sEmail = "";
    this.signupModel.rPassword = "";
    this.signupModel.sPassword = "";
    this.signupModel.firstname = "";
    this.signupModel.lastname = "";
  }

  //validate signup
  validateSignup() {
    var valid = true;
    //valid repasssword
    if(this.signupPasswordValid == false) {
      valid = false;
    }

    //validate password length
    if(this.signupPasswordLength == false) {
      valid = false;
    }
    console.log(valid);
    return valid;
  }



  validatePasswordSignup() {
    this.validatePasswordSignupLength();
    if(this.signupModel.sPassword != this.signupModel.rPassword) {
      this.signupPasswordValid = false;
      return;
    }
    this.signupPasswordValid = true;
  }

  validatePasswordSignupLength() {
    if(this.signupModel.sPassword && this.signupModel.rPassword){
      if(this.signupModel.sPassword.length < 6 || this.signupModel.rPassword.length < 6) {
        this.signupPasswordLength = false;
      }
      else {
        this.signupPasswordLength = true;
      }
    }
  }
}
