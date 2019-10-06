import { Directive,HostListener } from '@angular/core';
import {UserBasicComponent} from './user-basic.component';

@Directive({
  selector: 'p[appClick]'
})
export class AppClickDirective {

  constructor(private user:UserBasicComponent) { }

  @HostListener('click', ['$event'])
  onClickEvent(event: MouseEvent) {
    let target = event.target || event.srcElement;
    let userName = target['innerText'];
    this.user.userName = userName;
    this.user.getProfile();
  }
}
