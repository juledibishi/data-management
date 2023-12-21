import { Component, inject } from '@angular/core';
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

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  searchForm = new FormGroup({
    search: new FormControl('')
  })


  products: Product[] = [];
  dataService = inject(DataService);

  itemsPerPage: number = 5;
  totalItems: number = 0;
  currentPage: number = 0;


  constructor(public dialog: MatDialog) {

  }
  ngOnInit() {
    this.getProducts();

  }

  getProducts() {
    this.dataService.getProducts().subscribe(products => {

      this.products = products;

    })
  }

  editProduct(product: Product) {

    const dialogRef = this.dialog.open(EditProductComponent, {
      data: product
    });

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

  searchProduct() {
    const searchTerm = this.searchForm?.get('search')?.value?.toLowerCase();

    if (searchTerm) {
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
