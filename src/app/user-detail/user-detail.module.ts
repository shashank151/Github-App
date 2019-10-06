import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserBasicComponent } from './user-basic/user-basic.component';
import { RouterModule, Routes } from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { AppClickDirective } from './user-basic/app-click.directive';



@NgModule({
  declarations: [UserBasicComponent, AppClickDirective],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule,
    ToastrModule
  ]
})
export class UserDetailModule { }
