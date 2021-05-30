import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialInstance, MaterialService } from '../../classes/material.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html'
})
export class SiteLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('side_menu') side_menuRef: ElementRef;
  modal: MaterialInstance;


  links = [
    { url: '/workout', name: 'Workout' },
    { url: '/base', name: 'Base' },
    { url: '/support', name: 'Support' }
  ];

  constructor(private _auth: AuthService,
    private _router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initializeSideMenu(this.side_menuRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  logout(event: Event): void {
    event.preventDefault();
    this._auth.loguot();
    this._router.navigate(['/login']);
  }

  closeNav(): void {
    this.modal.close();
  }

}
