import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchesComponent } from './branches.component';
import { ListBranchComponent } from './list-branch/list-branch.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { UpdateBranchComponent } from './update-branch/update-branch.component';

const routes: Routes = [
  {
    path: '',
    component: BranchesComponent,
    children: [
      {
        path: 'list',
        component: ListBranchComponent,
      },
      {
        path: 'add',
        component: AddBranchComponent,
      },
      {
        path: 'update/:code',
        component: UpdateBranchComponent
      },
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
