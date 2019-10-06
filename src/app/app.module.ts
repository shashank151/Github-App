import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { UserDetailModule } from './user-detail/user-detail.module';
import { LoginComponent } from './login/login/login.component';
import { UserBasicComponent } from './user-detail/user-basic/user-basic.component';
import { AppService } from './app.service';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'user-basic', component: UserBasicComponent },
  { path: 'notfound', component: NotFoundComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '*', component: LoginComponent },
  { path: '**', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    UserDetailModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    ToastrModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
