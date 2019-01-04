import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import { Logout } from './auth/auth.actions';
import { AppState } from './reducers';
import { map } from 'rxjs/internal/operators/map';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    isLoggedIn$ :Observable<boolean>;
    isLoggedOut$ :Observable<boolean>;
    constructor( private store:Store<AppState>,private router:Router) {

    }

    ngOnInit() {
      this.isLoggedIn$=this.store.pipe(
       select(isLoggedIn));
        this.isLoggedOut$= this.store.pipe(
         select(isLoggedOut));
    }
   
    logout() {
      this.store.dispatch( new Logout());      
    }


}
