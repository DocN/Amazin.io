import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { auth } from 'firebase';
import { UserServiceService } from './user-service.service';


@Injectable({
  providedIn: 'root'
})
export class FireauthServiceService {
  private userData;
  public signupError;
  constructor(public afAuth: AngularFireAuth, private userService: UserServiceService) { 
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

  signup(email: string, password: string, firstname: string, lastname: string) {
    this.afAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        if(this.afAuth.auth.currentUser.emailVerified == false) {
          this.afAuth.auth.currentUser.sendEmailVerification().then(
            (success) => {
            this.applyDisplayName(firstname + " " + lastname);
            console.log("please verify your email");
          } 
          ).catch(
            (err) => {
              console.log(err);
            }
          )
          console.log('Success!', value);
          this.userService.loadUserID(this.afAuth.auth.currentUser.uid, firstname, lastname);
        }
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.signupError = err.message;
      });    
  }

  applyDisplayName(name: string) {
    var user = this.afAuth.auth.currentUser;
    user.updateProfile({
      displayName: name,
      photoURL: ""
    }).then(function(response) {
      //Success
    }, function(error) {
      //Error
      console.log(error);
    });
  }


  logout() {
    this.afAuth.auth.signOut();
  }
}

