import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ApiResponse } from 'src/app/models/response.model';
import { BranchService } from 'src/app/services/branch.service';

@Component({
  selector: 'app-update-branch',
  templateUrl: './update-branch.component.html',
  styleUrls: ['./update-branch.component.scss']
})
export class UpdateBranchComponent {

  code: number = 0;
  branchData: any | undefined;

  constructor(
    private router: Router,
    private branchService: BranchService,
    private messageService: MessageService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {    
    this.route.params.subscribe(params => {
      this.code = params['code'];      
      this.getBranchData();
    });
  }

  navigateToListBranch() {    
    this.router.navigate(['/pages/branches/list']);
  }

  onFormSubmit(form: FormGroup) {    
    const data = form.value;
    this.branchService.updateBranch(this.code,data).subscribe({
      next: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Fue actualizada con exito' });
        setTimeout(() => {          
          this.navigateToListBranch();
        }, 1000);
      },
      error: (error: any) => {
        console.log(error);
      }
    })      
  }

  getBranchData(): void {
    this.branchService.getBranchById(this.code).subscribe({
      next: (data: ApiResponse) => {
        if (data.succeeded && data.data) {          
          this.branchData = data.data;
        }
      },
      error: (error: any) => {
        console.error('Error al obtener los datos de la sucursal:', error);
      }
    });
  }
}
