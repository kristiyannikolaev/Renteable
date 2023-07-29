import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  @Input() isOpened:boolean =  false;
  @Input() screenWidth: number = 0;

  getBodyClass(): string {
    let styleCLass = '';

    if(this.isOpened && this.screenWidth > 768) styleCLass = 'body-trimmed';
    else if(this.isOpened && this.screenWidth < 768 && this.screenWidth > 0)
      styleCLass = 'body-md-screen';

    return styleCLass;
  }
}
