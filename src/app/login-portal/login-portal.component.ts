import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import { auth } from 'firebase';
import { FireauthServiceService } from '../fireauth-service.service';
import { NgxSpinnerService } from 'ngx-spinner';

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

}
