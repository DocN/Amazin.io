import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FireauthServiceService {
  private userData;
  public signupError;
  constructor(public afAuth: AngularFireAuth) { 
    this.afAuth.user.subscribe(
      (data) => {
        this.userData = data;
      }
    )
  }
  
  loginGoogle() {
    this.afAuth
      .auth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then(value => {
        console.log("Google Login Successful");
      }).catch(err => {
        console.log(err);
      });
  }

  signup(email: string, password: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        if(this.afAuth.auth.currentUser.emailVerified == false) {
          this.afAuth.auth.currentUser.sendEmailVerification().then(
            (success) => {
              console.log(this.afAuth.auth.currentUser.emailVerified);
            console.log("please verify your email");
            this.logout();
          } 
          ).catch(
            (err) => {
              console.log(err);
            }
          )
          console.log('Success!', value);
        }
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.signupError = err.message;
      });    
  }


  logout() {
    this.afAuth.auth.signOut();
  }
}

