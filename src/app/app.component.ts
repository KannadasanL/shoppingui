import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  featureSelected = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyDFPUhtrY7uWINAqHVO5SZ_-PxQIJqZucc",
      authDomain: "ng-shoppingui.firebaseapp.com",
    });
  }

  onSelect(feature: string) {
    this.featureSelected = feature;
  }
}
