import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies/ng2-cookies';


@Component({
  selector: 'app-user-basic',
  templateUrl: './user-basic.component.html',
  styleUrls: ['./user-basic.component.css']
})
export class UserBasicComponent implements OnInit {

  public profileData: any;
  public starRepo: any;
  public userName: any;
  public userReposList: any;
  public userGistsList: any;
  public userFollowerList: any;
  public userReposListLength: number;
  public userGistsListLength: number;
  public userFollowerListLength: number;
  public p: number = 1;
  public g: number = 1;
  public f: number = 1;

  constructor(private appService: AppService,
    private router: Router,
    private toastr: ToastrService) {

  }
  ngOnInit() {
    if (Cookie.get('accessToken')) {
      this.appService.accessToken = Cookie.get('accessToken');
      this.showUSerInfo();
    }
    else {
      console.log('cookie empty');
      this.router.navigate(['/login']);
    }
  }
  public showUSerInfo: any = () => {
    this.appService.getUserProfileInfo(this.appService.accessToken).subscribe((apiResponse) => {
      this.profileData = apiResponse;
      this.appService.userName = apiResponse.login;
      this.showStarredRepo();
      this.userRepos();
    }),(err) =>{
      this.router.navigate(['/not-found']);
    }
  }
  public showStarredRepo: any = () => {
    this.appService.getStarredRepo().subscribe((apiResponse) => {
      this.starRepo = Object.keys(apiResponse).length;
    })
  }

  public getProfile: any = () => {
    if (!this.userName) {
      this.toastr.warning('Enter Username');
    }
    else {
      this.appService.userName = this.userName;
      this.appService.getProfileInfo().subscribe((apiResponse) => {
        this.profileData = apiResponse;
        this.showStarredRepo();
        this.userRepos();
      },(err) => {
        this.toastr.error('Enter Correct Username');
      })
    }
  }


  public userRepos: any = () => {
    this.appService.getUserRepos()
      .subscribe((apiResponse) => {
        this.userReposList = apiResponse;
        this.userReposListLength = Object.keys(apiResponse).length;
        let displayRepo = document.getElementById("user-pubic-repo-list");
        let displayGist = document.getElementById("user-public-gist-list");
        let displayfollower = document.getElementById("user-followers-list");
        displayRepo.style.display = "block";
        displayGist.style.display = "none";
        displayfollower.style.display = "none";
      }),(err) =>{
        this.router.navigate(['/not-found']);
      }
  }

  public userGists: any = () => {
    this.appService.getUserGists()
      .subscribe((apiResponse) => {
        this.userGistsList = apiResponse;
        this.userGistsListLength = Object.keys(apiResponse).length;
        let displayRepo = document.getElementById("user-pubic-repo-list");
        let displayGist = document.getElementById("user-public-gist-list");
        let displayfollower = document.getElementById("user-followers-list");
        displayRepo.style.display = "none";
        displayGist.style.display = "block";
        displayfollower.style.display = "none"
      }),(err) =>{
        this.router.navigate(['/not-found']);
      }
  }

  public userFollowers: any = () => {
    this.appService.getUserFollowers()
      .subscribe((apiResponse) => {
        this.userFollowerList = apiResponse;
        this.userFollowerListLength = Object.keys(apiResponse).length;
        let displayRepo = document.getElementById("user-pubic-repo-list");
        let displayGist = document.getElementById("user-public-gist-list");
        let displayfollower = document.getElementById("user-followers-list");
        displayRepo.style.display = "none";
        displayGist.style.display = "none";
        displayfollower.style.display = "block";
      }),(err) =>{
        this.router.navigate(['/not-found']);
      }
  }

  public userLogout: any = () => {
    Cookie.delete('accessToken');
    this.router.navigate(['/login']);
  }
}
