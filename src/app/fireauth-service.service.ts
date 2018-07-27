import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FireauthServiceService {
  private userData;
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
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
      });    
  }


  logout() {
    this.afAuth.auth.signOut();
  }
}

