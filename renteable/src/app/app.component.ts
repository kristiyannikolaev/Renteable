import { Component } from '@angular/core';
import { sidenavToggle } from './interfaces/sidenavToggle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'renteable';

  isSidenavOpened: boolean = false;
  screenWidth:number = 0;

  onToggleSidenav(data: sidenavToggle) {
    this.screenWidth = data.screenWidth;
    this.isSidenavOpened = data.isOpened;
  }
}
