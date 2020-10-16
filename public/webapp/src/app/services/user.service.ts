import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'http://localhost:8443/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  login(userData): Observable<any> {
    return this.http.post(
      API + 'user/login',
      {
        email: userData.email,
        password: userData.password,
      },
      httpOptions
    );
  }

  addUser(userData): Observable<any> {
    return this.http.post(
      API + 'user/register',userData,
      httpOptions
    );
  }

  getMomentListByUserId(): Observable<any> {
    return this.http.get( API + 'moment/', httpOptions);
  }

  addMoment(momentData): Observable<any> {
    let option={
      headers: new HttpHeaders({
      })
    };
    return this.http.post(
      API + 'moment/',momentData,
      option
    );
  }

  deleteMoment(id): Observable<any> {
    return this.http.delete(API + 'moment/' + id, httpOptions);
  }

  updateMoment(id,momentData): Observable<any> {
    let option={
      headers: new HttpHeaders({
      })
    };
    return this.http.put(API + 'moment/' + id, momentData,option);
  }

}
