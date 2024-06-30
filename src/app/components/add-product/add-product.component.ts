import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  constructor(public dialogRef: MatDialogRef<AddProductComponent>) { }

  productForm = new FormGroup({

    title: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    discountPercentage: new FormControl('', Validators.required),
    rating: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })

  ngOnInit() {

  }

  onNoClick() {
    this.dialogRef.close();
  }

  add() {

    if (this.productForm.valid) {
      this.dialogRef.close(this.productForm.value);

    }

  }

}
