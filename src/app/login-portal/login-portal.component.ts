import { Component, OnInit } from '@angular/core';
import { ElementRef, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';

@Component({
  selector: 'app-login-portal',
  templateUrl: './login-portal.component.html',
  styleUrls: ['./login-portal.component.scss'],
  exportAs: 'child'
})
export class LoginPortalComponent implements OnInit {

  @ViewChild('basicModal') public autoShownModal:ModalDirective;

  constructor() { 
  }

  ngOnInit() {
  }

  openModal() {
    this.autoShownModal.show();
  }

}
