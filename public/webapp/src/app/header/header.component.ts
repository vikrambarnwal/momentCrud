import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string='';
  constructor(public tokenService:StorageService) { }

  ngOnInit() {
    this.userName = this.tokenService.getUser().fullName;
  }

  logout(){
    this.tokenService.logOut();
  }

}
