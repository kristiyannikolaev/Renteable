import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './navbar-data';
import { sidenavToggle } from '../interfaces/sidenavToggle';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit{

  @Output() onToggleSidenav: EventEmitter<sidenavToggle> = new EventEmitter();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 768) {
      this.isOpened = false;
      this.onToggleSidenav.emit({screenWidth:this.screenWidth, isOpened: this.isOpened});
    }
  }

  isOpened: boolean = false;
  screenWidth: number = 0;
  navData = navbarData;

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }

  closeNav() {
    this.isOpened = false;
    this.onToggleSidenav.emit({screenWidth:this.screenWidth, isOpened: this.isOpened});
  }

  toggleSidebar() {
    this.isOpened = !this.isOpened;
    this.onToggleSidenav.emit({screenWidth:this.screenWidth, isOpened: this.isOpened});
  }
}
