import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AddProductComponent } from '../add-product/add-product.component';
import { Product } from '../../models/product.model';
import { DataService } from '../../services/data.service';
import { Search } from '../../models/search-output.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {


  @Output() filterProduct = new EventEmitter<string>();

  searchForm = new FormControl();





  searchProduct() {

    this.filterProduct.emit(this.searchForm.value);

  }
}
