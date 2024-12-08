import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '@services/product.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product.component.html',
})
export class ProductComponent {
  userEmail = ''; // Store authenticated user email
  products: any[] = [];
  product: any = { id: '', name: '', price: 0, expirationDate: '' };
  selectedAction = '';

  constructor(private productService: ProductService) {}
  ngOnInit() {
    // Assume the authenticated user’s email is stored globally
    const storedEmail = sessionStorage.getItem('authenticatedEmail');
    if (storedEmail) {
      this.userEmail = storedEmail; // Set the email
    }
  }

  // Manage menu selection
  async handleMenuSelection() {
    switch (this.selectedAction) {
      case '1':
        await this.displayProducts();
        break;
      case '2':
        await this.fetchProductById();
        break;
      case '3':
        await this.addProduct();
        break;
      case '4':
        await this.updateProduct();
        break;
      case '5':
        await this.deleteProduct();
        break;
      case '6':
        await this.viewTopExpensiveProducts();
        break;
      default:
        alert('Invalid choice. Please try again.');
    }
  }

  // Actions similar to CLI
  async displayProducts() {
    try {
      this.products = await this.productService.getAllProducts(this.userEmail);
      alert('Products fetched successfully!');
    } catch (error) {
      console.error('Error fetching products:', error);
      alert('Failed to fetch products.');
    }
  }

  async fetchProductById() {
    try {
      const product = await this.productService.getProductById(this.userEmail, this.product.id);
      alert(`Product Found: ${JSON.stringify(product)}`);
    } catch (error) {
      console.error('Error fetching product:', error);
      alert('Failed to fetch product.');
    }
  }

  async addProduct() {
    try {
      await this.productService.addProduct(this.userEmail, this.product);
      alert('Product added successfully!');
      await this.displayProducts(); // Refresh products
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product.');
    }
  }

  async updateProduct() {
    try {
      await this.productService.updateProduct(this.userEmail, this.product);
      alert('Product updated successfully!');
      await this.displayProducts(); // Refresh products
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product.');
    }
  }

  async deleteProduct() {
    try {
      await this.productService.deleteProduct(this.userEmail, this.product.id);
      alert('Product deleted successfully!');
      await this.displayProducts(); // Refresh products
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product.');
    }
  }

  async viewTopExpensiveProducts() {
    try {
      this.products = await this.productService.getTopExpensiveProducts(this.userEmail);
      alert('Top 3 expensive products fetched successfully!');
    } catch (error) {
      console.error('Error fetching top products:', error);
      alert('Failed to fetch top expensive products.');
    }
  }
}
