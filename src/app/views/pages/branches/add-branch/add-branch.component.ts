import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent {

  constructor(
    private router: Router,
    private branchService: BranchService,
    private messageService: MessageService
  ) { }

  navigateToListBranch() {    
    this.router.navigate(['/pages/branches/list']);
  }

  onFormSubmit(form: FormGroup) {    
    const data = form.value;
    this.branchService.addBranch(data).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Fue creada con exito' });
        setTimeout(() => {          
          this.navigateToListBranch();
        }, 500);
      },
      error: (error) => {
        console.log(error);
      }
    })      
  }
}
