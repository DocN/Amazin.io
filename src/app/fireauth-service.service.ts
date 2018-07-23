import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FireauthServiceService {

  constructor(public afAuth: AngularFireAuth) { 

  }
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
