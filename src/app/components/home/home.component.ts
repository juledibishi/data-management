import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { QuickFilterComponent } from '../quick-filter/quick-filter.component';
import { AddProductComponent } from '../add-product/add-product.component';
import { QuickFilter } from '../../models/quick-filter-output.model';
import { SearchComponent } from "../search/search.component";
import { NgxPaginationModule } from 'ngx-pagination';
import { View } from '../../models/views.model';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    QuickFilterComponent,
    SearchComponent,
    NgxPaginationModule
  ]
})

export class HomeComponent {


  data: View[] = [{
    id: 1,
    name: 'View 1',
  },
  {
    id: 2,
    name: 'View 2'
  },
  {
    id: 3,
    name: 'View 3'
  },
  {
    id: 4,
    name: 'View 4'
  },
  {
    id: 5,
    name: 'View 5'
  }

  ]

  products: Product[] = [];
  dataService = inject(DataService);

  p: any;
  count: any;

  constructor(public dialog: MatDialog) {

  }
  ngOnInit() {
    this.getProducts();

  }

  showProductAsc(property: keyof Product) {
    this.products = this.products.sort((a, b) => {
      if (a[property] < b[property]) return -1;
      if (a[property] > b[property]) return 1;
      return 0;
    });
  }
  showProductDsc(property: keyof Product) {
    this.products = this.products.sort((a, b) => {
      if (a[property] > b[property]) return -1;
      if (a[property] < b[property]) return 1;
      return 0;
    });
  }

  quickFilterResult(event: QuickFilter, columnName: any) {




    if (event.sortBy === 'asc') {
      this.showProductAsc(columnName);
    }
    else {
      this.showProductDsc(columnName);
    }


    this.showFilter(event.searchText, columnName);


  }

  showFilter(filter: string, columnName: string) {
    if (filter) {
      this.products = this.products.filter(x => {
        const value = x[columnName as keyof Product];
        if (typeof value === 'string') {
          return value.includes(filter);
        } else if (typeof value === 'number') {
          // Convert both value and filter.search to string for comparison
          return value.toString().includes(filter);
        }
        return false; // Return false for other types (e.g., boolean)
      });


    }

  }

  getProducts() {
    this.dataService.getProducts().subscribe(products => {

      this.products = products;

    })
  }



  addProduct() {
    const dialogRef = this.dialog.open(AddProductComponent, {

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.products.unshift(result);
      }
    })
  }

  editProduct(product: Product) {

    const dialogRef = this.dialog.open(EditProductComponent, {
      data: product
    });
    console.log(product);

    dialogRef.afterClosed().subscribe(editedProduct => {



      if (editedProduct) {

        const foundProduct = this.products.find(x => x.id === editedProduct.id);

        if (foundProduct) {
          foundProduct.title = editedProduct.title;
          foundProduct.description = editedProduct.description;
          foundProduct.price = editedProduct.price;
          foundProduct.discountPercentage = editedProduct.discountPercentage;
          foundProduct.rating = editedProduct.rating;
          foundProduct.stock = editedProduct.stock;
          foundProduct.brand = editedProduct.brand;
          foundProduct.category = editedProduct.category;
        }

      }
    });
  }

  deleteProduct(product: Product, index: number) {

    this.products.splice(index, 1)

  }

  searchProduct(event: string) {


    const searchTerm = event.trim().toLocaleLowerCase();

    if (searchTerm) {
      console.log(searchTerm);

      this.products = this.products.filter(product =>
        Object.values(product).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm)
        )
      );

    } else {
      this.getProducts()
    }
  }


}
