import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    public router: Router,
    private apiService: UserService,
    private tokenStorage: StorageService
  ) {}

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      const jwtDecoder = new JwtHelperService();
      const decodeData = jwtDecoder.decodeToken(this.tokenStorage.getToken());
      if(decodeData.userId){
        this.router.navigate(['/addmoment']);
      }else{
        this.tokenStorage.logOut();
      }
    }
  }

  onSubmit() {
    this.apiService.login(this.form).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.data.sessionToken);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        const jwtDecoder = new JwtHelperService();
        const decodeData = jwtDecoder.decodeToken(data.data.sessionToken);

        this.tokenStorage.saveUser(decodeData);
        this.router.navigate(['/addmoment']);
      },
      (err) => {
        alert(err.error.msg);
        this.isLoginFailed = true;
      }
    );
  }
}
