import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserBasicComponent} from '../user-detail/user-basic/user-basic.component';

const routes:Routes = [{path:'user-basic',component:UserBasicComponent}]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ]
})
export class LoginModule { }
