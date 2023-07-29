import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import{ animate, style, transition, trigger, keyframes } from '@angular/animations';
import { Observable } from 'rxjs';

import { navbarDataLoggedIn, navbarDataLoggedOut } from './navbar-data';
import { sidenavToggle } from '../interfaces/sidenavToggle';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  animations: [
    trigger('rotate', [
      transition(':enter', [
        animate('500ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn', offset: '1'})  
          ])
        )
      ])
    ]),
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0}),
        animate('350ms',
          style({opacity: 1})
        )
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate('150ms',
          style({opacity: 0})
        )
      ])
    ])
  ]
})
export class NavigationComponent implements OnInit{

  @Output() onToggleSidenav: EventEmitter<sidenavToggle> = new EventEmitter();

  @HostListener('window:resize')
  onResize() {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth < 768) {
      this.isOpened = false;
      this.onToggleSidenav.emit({screenWidth:this.screenWidth, isOpened: this.isOpened});
    }
  }

  isOpened: boolean = false;
  screenWidth: number = 0;
  navDataLoggedIn = navbarDataLoggedIn;
  navDataLoggedOut = navbarDataLoggedOut;

  user$: Observable<unknown>;

  constructor(private userService: UserService, private router: Router) {
    this.user$ = this.userService.currentUser$;
  }

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

  logout() {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
    })
  }
}
