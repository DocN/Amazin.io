import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase';
import { FireauthServiceService } from '../fireauth-service.service';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  


  constructor(private session:FireauthServiceService, private userService:UserServiceService) { 
    console.log(this.userService.users);
  }

  ngOnInit() {
  }
  login() {
    this.session.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logout() {
    this.session.afAuth.auth.signOut();
  }
  
}
