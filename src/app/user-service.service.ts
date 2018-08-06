import { Injectable } from '@angular/core';
import { User } from './models/user';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//auth service 
import { AngularFireAuth } from 'angularfire2/auth';


@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userData: User[];

  //user data
  private currentUserID: string; 
  private firstname: string;
  private lastname: string;

  //current user data object
  currentUser = <User>{};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.currentUserID = "";
    this.afAuth.user.subscribe(
      (data) => {
        if(data == null) {
          return;
        }
        this.currentUserID = data.uid;  
        this.resetProfileSub(); 
        
        this.users.subscribe(firedata=> { //converting oberv in array
          //array of user data 
          this.userData = firedata;
          console.log(this.userData);
          //check if we have our user data
          if(this.userData.length > 0) {
            this.currentUser = this.userData[0];
          }
          //check if a profile already exists
        });
      }
    );
  }

  setUserID(userID: string) {
    this.currentUserID = userID;
  }

  loadUserData() {
    console.log("creating profile");
    this.resetProfileSub();
    this.users.subscribe(fireData=> { //converting oberv in array
      //array of user data 
      this.userData = fireData;
      console.log(this.userData);
      //create profile in the event one doesn't already exist
      if(this.userData.length <= 0 && this.currentUserID != "") {
        this.createProfile();
      }
    });
  }

  resetProfileSub() {
    this.userCollection = this.afs.collection<User>("Users", ref => {
      return ref.where("userID", '==', this.currentUserID);
    });
    this.users = this.userCollection.valueChanges();
  }

  createProfile() {
    //create a blank profile
    var newUser = this.generateDefaultUser();

    this.userCollection.doc(this.currentUserID).set(newUser);

    //this.userCollection.doc(this.currentUserID).set(({ userID: this.currentUserID, displayname: this.displayName, currentBalance: 0.00, lifeTimeEarning: 0.00 }));
  }

  generateDefaultUser() {
    //create a blank profile
    var newUser = <User>{};

    //set user data
    newUser.userID = this.currentUserID;
    newUser.firstname = this.firstname;
    newUser.lastname = this.lastname;
    newUser.address = "";
    newUser.country = "";
    newUser.currentBalance = 0.00;
    newUser.lifeTimeEarning = 0.00;

    return newUser;
  }

  loadUserID(userID: string, firstname: string, lastname: string) {
    this.currentUserID = userID;
    this.firstname = firstname;
    this.lastname = lastname;
    this.loadUserData();
  }
}
