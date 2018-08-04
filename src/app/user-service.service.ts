import { Injectable } from '@angular/core';
import { User } from './models/user';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private itemsCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  userData: User[];

  //user data
  private currentUserID: string; 
  private displayName: string;

  constructor(private afs: AngularFirestore) {
    this.currentUserID = "";
    this.itemsCollection = this.afs.collection<User>("Users", ref => {
      return ref.where("userID", '==', this.currentUserID);
    });
    this.users = this.itemsCollection.valueChanges();
    this.users.subscribe(invoice=> { //converting oberv in array
      //array of user data 
      this.userData = invoice;
      console.log(this.userData);
      //check if a profile already exists
      if(this.userData.length <= 0 && this.currentUserID != "") {
        //create profile if one does not already exist.
        //this.createProfile();
      }

    });
  }

  setUserID(userID: string) {
    this.currentUserID = userID;
  }

  loadUserData() {
    console.log("creating profile");
    this.itemsCollection = this.afs.collection<User>("Users", ref => {
      return ref.where("userID", '==', this.currentUserID);
    });
    this.users = this.itemsCollection.valueChanges();
    this.users.subscribe(invoice=> { //converting oberv in array
      //array of user data 
      this.userData = invoice;
      console.log(this.userData);
      if(this.userData.length <= 0 && this.currentUserID != "") {
        this.createProfile();
      }
    });
  }

  createProfile() {
    //check if a profile already exists
    this.itemsCollection.doc(this.currentUserID).set(({ userID: this.currentUserID, displayname: this.displayName, currentBalance: 0.00, lifeTimeEarning: 0.00 }));
  }

  loadUserID(userID: string, displayName: string) {
    this.currentUserID = userID;
    this.displayName = displayName;
    this.loadUserData();
  }
}
