import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit{
  items: MenuItem[] = [];
  ngOnInit(): void {
    this.items = [
      {label: 'Sucursales', icon: 'pi pi-home', routerLink: ['/branches']}
    ];
  }

}
