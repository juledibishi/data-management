import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Product } from '../../models/product.model';
import { DataService } from '../../services/data.service';
import { QuickFilter } from '../../models/quick-filter-output.model';
@Component({
  selector: 'app-quick-filter',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './quick-filter.component.html',
  styleUrl: './quick-filter.component.scss'
})
export class QuickFilterComponent {

  @Input() name = '';

  @Output() filterAndSort = new EventEmitter<QuickFilter>();


  sortBy: string = '';
  surname: string = 'ibishi';
  searchForm = new FormGroup({
    search: new FormControl()
  })

  constructor(private dataService: DataService) { }

  ngOnInit() {


  }

  filterByColumn() {

    this.filterAndSort.emit({
      searchText: this.searchForm.value.search,
      sortBy: this.sortBy,
      surname: this.surname
    });

  }


  public sortProducts(sortBy: string) {

    this.sortBy = sortBy;

    this.filterByColumn();
  }




}
