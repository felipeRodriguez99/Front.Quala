import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BranchModel } from 'src/app/models/branch.model';
import { CurrencyModel } from 'src/app/models/currency.model';
import { ApiResponse } from 'src/app/models/response.model';
import { BranchService } from 'src/app/services/branch.service';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-list-branch',
  templateUrl: './list-branch.component.html',
  styleUrls: ['./list-branch.component.scss']
})
export class ListBranchComponent implements OnInit {
  branches: BranchModel[] = [];
  cols: { field: string; header: string; }[];
  currenciesMap: { [id: number]: string } = {}; 

  constructor(
    private branchService: BranchService,
    private currencyService: CurrencyService,
    private router: Router,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) {
    this.cols = [
      { field: 'code', header: 'Codigo' },
      { field: 'description', header: 'Descripcion' },
      { field: 'identifications', header: 'Identificación' },
      { field: 'createdDate', header: 'Fecha de creación' },
      { field: 'currencyName', header: 'Moneda' }      
  ];
  }
  ngOnInit(): void {
    this.loadCurrencies();    
  }

  getAllBranches(): void {    
    this.branchService.getAllBranches().subscribe({
      next: (data: ApiResponse) => {        
        this.branches = data.data as BranchModel[];        
        this.branches.forEach(branch => {
          branch.currencyName = this.currenciesMap[branch.currencyId];
        });
      },
      error: (error: ApiResponse) => {
        console.log(error.message);
      },
    });
  }

   loadCurrencies(): void {
    this.currencyService.getAllCurrencies().subscribe({
      next: (data: any) => {        
        data.data.forEach((currency: CurrencyModel) => {
          this.currenciesMap[currency.id] = currency.abbreviation;
        });
        this.getAllBranches();
      },
      error: (error: any) => {
        console.error('Error al obtener las monedas:', error);
      },
    });
  }

  deleteBranch(code: number): void {
    this.branchService.deleteBranch(code).subscribe({
      next: (data: ApiResponse) => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Fue eliminada con exito' });
        this.getAllBranches();
      },
      error: (error: ApiResponse) => {
        console.log(error.message);
      },
    })
  }

  navigateToAddBranch() {    
    this.router.navigate(['/pages/branches/add']);
  }

  navigateToUpdateBranch(code: number) {        
    this.router.navigate(['/pages/branches/update',code]);
  }

  confirmDelete(branch: BranchModel) {
    this.confirmationService.confirm({
        message: 'Seguro que quieres eliminar la sucursal ' + branch.code,
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.deleteBranch(branch.code);            
        }
    });
}
}
