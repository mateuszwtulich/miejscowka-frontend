import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  /**
   * Shows additional information
   */
  isHomePage = true;
  isLogged = false;
  showFiller = false;
  subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.onNavigationChange();
  }

  private onNavigationChange(){
    this.subscription.add(this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
       this.isHomePage = event?.url.startsWith("/home");
      }
    }));
  }

  /**
   * Handles toggling of side menu
   */
  onToggle() {
    this.showFiller = !this.showFiller;
    this.dispatchGlobalResizeEvent();
  }

  navigate() {
    if (this.isLogged) {

    } else {
      this.router.navigateByUrl("/login");
    }
  }

  private dispatchGlobalResizeEvent() {
    setTimeout(() =>
        window.dispatchEvent(new Event('resize')),
      700);
  }
}
