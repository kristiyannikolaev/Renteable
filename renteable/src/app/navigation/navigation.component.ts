import { Component, OnInit } from '@angular/core';
import { navbarData } from './navbar-data';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{
  isOpened: boolean = true;
  navData = navbarData;

  ngOnInit(): void {
    console.log(this.navData);
  }

  closeNav() {
    this.isOpened = false;
  }

  // openNav() {
  //   this.isOpened = true;
  // }
  toggleSidebar() {
    this.isOpened = !this.isOpened;
  }
}
