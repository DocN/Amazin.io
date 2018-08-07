import { Component, OnInit } from '@angular/core';
import { CategoryItem } from '../models/category-item';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  private categoryCollection: AngularFirestoreCollection<CategoryItem>;
  categories: Observable<CategoryItem[]>;
  categoryData: CategoryItem[];

  constructor(private afs: AngularFirestore) {
    this.categoryCollection = this.afs.collection<CategoryItem>("categories", ref => {
      return ref;
    });
    this.categories = this.categoryCollection.valueChanges();

    this.categories.subscribe(fireData=> { //converting oberv in array
      //array of user data 
      this.categoryData = fireData;
      console.log(this.categoryData);
    });

   }

  ngOnInit() {
  }

}
