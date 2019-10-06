import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: any;
  public password: any;
  public accessToken:any;

  constructor(private appService: AppService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.accessToken = Cookie.get('accessToken');
    this.checkStatus();
  }

  public checkStatus:any = () =>{
    if(this.accessToken){
      this.router.navigate(['user-basic']);
    }
    else{
      this.router.navigate(['/']);
    }
    }   
  public signinFunction: any = () => {

    if (!this.email) {

      this.toastr.warning('Enter Username or Email');
    } 
    else if (!this.password) {

      this.toastr.warning('Enter password');
    } 
    else {

      let data = {
        email: this.email,
        password: this.password
      }
      this.appService.loginFunction(data)
        .subscribe((apiResponse) => {
          console.log(apiResponse);
          if (apiResponse.token) {
            Cookie.set('accessToken', apiResponse.token);
            this.appService.accessToken = apiResponse.token;
            this.router.navigate(['/user-basic']);
          }
          else {
            this.toastr.error(apiResponse.message);
          }
        }, (err) => {
          this.toastr.error('Enter Correct Combination of Email/password');
        });
    }
  }
}