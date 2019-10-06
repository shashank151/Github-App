import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';

declare const Buffer;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private url: any = 'https://api.github.com';
  private email: any;
  private password: any;
  public accessToken: any;
  public userName: any;

  constructor(private http: HttpClient) { }

  public loginFunction(data: any): Observable<any> {
    this.email = data.email;
    this.password = data.password;
    let b = new Buffer(this.email + ':' + this.password).toString('base64');
    let c =Math.random();

    return this.http.post(this.url + '/authorizations', { "scopes": ["repo", "user"], "note": "getting-started"+c}, {
      headers: {
        'Authorization': 'Basic ' + b
      }
    })
  };

  public getUserProfileInfo(accessToken): Observable<any> {
    let token = accessToken;
    return this.http.get(this.url + '/user', {
      headers: {
        'Authorization': 'token ' + token
      }
    });
  }

  public getProfileInfo(): Observable<any> {
    return this.http.get(this.url + '/users/' + this.userName);
  }
  public getUserRepos(): Observable<any> {
    return this.http.get(this.url + '/users/' + this.userName + '/repos');
  }
  public getUserGists(): Observable<any> {
    return this.http.get(this.url + '/users/' + this.userName + '/gists');
  }
  public getUserFollowers(): Observable<any> {
    return this.http.get(this.url + '/users/' + this.userName + '/followers');
  }
  public getUserFollowing(): Observable<any> {
    return this.http.get(this.url + '/users/' + this.userName + '/following');
  }
  public getStarredRepo(): Observable<any> {
    return this.http.get(this.url + '/users/' + this.userName + '/starred');
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof Error) {
      errorMessage = 'An Error Ocurred : ${err.error.message}';
    }
    else {
      errorMessage = 'Server returned code: ${err.status}, error message is :${error.message}';
    }

    return Observable.throw(errorMessage);
  }

}
