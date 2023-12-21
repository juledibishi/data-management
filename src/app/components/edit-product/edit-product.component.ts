import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from '../../models/product.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  constructor(public dialogRef: MatDialogRef<EditProductComponent>, @Inject(MAT_DIALOG_DATA) public product: Product) {

  }

  productForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    brand: new FormControl(),
    category: new FormControl(),
    price: new FormControl(),
    discountPercentage: new FormControl(),
    rating: new FormControl(),
    description: new FormControl(),
  })

  ngOnInit() {
    this.productForm.patchValue(this.product)

  }


  onNoClick(): void {
    this.dialogRef.close();
  }


  save() {
    this.dialogRef.close(this.productForm.value);


  }
}
