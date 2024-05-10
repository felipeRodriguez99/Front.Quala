import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyModel } from 'src/app/models/currency.model';
import { ApiResponse } from 'src/app/models/response.model';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-form-branch',
  templateUrl: './form-branch.component.html',
  styleUrls: ['./form-branch.component.scss']
})
export class FormBranchComponent implements OnInit, OnChanges  {
  @Input() branchData: any;
  @Output() formSubmit: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  form!: FormGroup;
  currencies: CurrencyModel[] = [];
  isUpdate = false;

  constructor(
    private currencyService: CurrencyService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadCurrencies();
    this.initializeForm();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['branchData'] && changes['branchData'].currentValue) {
      this.updateForm();
      this.isUpdate = true;
    } else {
      this.isUpdate = false;
    }
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      description: ['', Validators.required],
      address: ['', Validators.required],
      identifications: ['', Validators.required],
      currencyId: [null, Validators.required]
    });
  }

  private updateForm(): void {
    this.form.patchValue({
      description: this.branchData.description || '',
      address: this.branchData.address || '',
      identifications: this.branchData.identifications || '',
      currencyId: this.branchData.currencyId || null
    });
  }

  private loadCurrencies(): void {
    this.currencyService.getAllCurrencies().subscribe({
      next: (data: ApiResponse) => {        
        this.currencies = data.data as CurrencyModel[];
      },
      error: (error: any) => {
        console.error('Error al obtener las monedas:', error);
      },
    });
  }

  onSubmit(): void {    
    this.formSubmit.emit(this.form);
  }
}
