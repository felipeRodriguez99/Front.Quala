import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { BranchesComponent } from './branches/branches.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: 'branches',
        loadChildren: () =>
          import('../pages/branches/branches.module').then((m) => m.BranchesModule),
      },
      {
        path: '',
        redirectTo: 'branches',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'branches',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
