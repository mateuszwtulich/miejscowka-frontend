import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  /**
   * Shows additional information
   */
  
showFiller = false;

constructor() { }

  ngOnInit(): void {
  }

  /**
   * Handles toggling of side menu
   */
  onToggle() {
    this.showFiller = !this.showFiller;
    this.dispatchGlobalResizeEvent();
  }

  private dispatchGlobalResizeEvent() {
    setTimeout(() =>
        window.dispatchEvent(new Event('resize')),
      700);
  }
}
