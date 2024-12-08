import { Injectable } from '@angular/core';
import axios from 'axios';
import { trace, context, Span } from '@opentelemetry/api';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';
  private tracer = trace.getTracer('angular-frontend');

  // Helper Method to End Span Safely
  private endSpan(span: Span, error?: any) {
    if (error) {
      span.recordException(error);
      span.setStatus({ code: 2, message: error.message });
    }
    span.end();
  }

  async getAllProducts(userEmail: string): Promise<any[]> {
    const span = this.tracer.startSpan('getAllProducts', {
      attributes: { 'user.email': userEmail },
    });

    try {
      const response = await axios.get(`${this.baseUrl}/readAllProducts`, {
        headers: { 'user-email': userEmail },
      });
      span.addEvent('Products retrieved successfully', {
        count: response.data.length,
      });
      this.endSpan(span);
      return response.data;
    } catch (error) {
      this.endSpan(span, error);
      throw error;
    }
  }

  async getProductById(userEmail: string, id: string): Promise<any> {
    const span = this.tracer.startSpan('getProductById', {
      attributes: { 'user.email': userEmail, 'product.id': id },
    });

    try {
      const response = await axios.get(`${this.baseUrl}/readProductById/${id}`, {
        headers: { 'user-email': userEmail },
      });
      span.addEvent('Product fetched successfully', { productId: id });
      this.endSpan(span);
      return response.data;
    } catch (error) {
      this.endSpan(span, error);
      throw error;
    }
  }

  async addProduct(userEmail: string, product: any): Promise<any> {
    const span = this.tracer.startSpan('addProduct', {
      attributes: { 'user.email': userEmail, 'product.name': product.name },
    });

    try {
      const response = await axios.post(`${this.baseUrl}/create`, product, {
        headers: {
          'user-email': userEmail,
          'Content-Type': 'application/json',
        },
      });
      span.addEvent('Product added successfully', { productName: product.name });
      this.endSpan(span);
      return response.data;
    } catch (error) {
      this.endSpan(span, error);
      throw error;
    }
  }

  async updateProduct(userEmail: string, product: any): Promise<any> {
    const span = this.tracer.startSpan('updateProduct', {
      attributes: { 'user.email': userEmail, 'product.id': product.id },
    });

    try {
      const response = await axios.put(`${this.baseUrl}/updateProduct`, product, {
        headers: {
          'user-email': userEmail,
          'Content-Type': 'application/json',
        },
      });
      span.addEvent('Product updated successfully', { productId: product.id });
      this.endSpan(span);
      return response.data;
    } catch (error) {
      this.endSpan(span, error);
      throw error;
    }
  }

  async deleteProduct(userEmail: string, id: string): Promise<void> {
    const span = this.tracer.startSpan('deleteProduct', {
      attributes: { 'user.email': userEmail, 'product.id': id },
    });

    try {
      await axios.delete(`${this.baseUrl}/deleteProduct/${id}`, {
        headers: { 'user-email': userEmail },
      });
      span.addEvent('Product deleted successfully', { productId: id });
      this.endSpan(span);
    } catch (error) {
      this.endSpan(span, error);
      throw error;
    }
  }

  async getTopExpensiveProducts(userEmail: string): Promise<any[]> {
    const span = this.tracer.startSpan('getTopExpensiveProducts', {
      attributes: { 'user.email': userEmail },
    });

    try {
      const response = await axios.get(
        `${this.baseUrl}/most-expensive-products`,
        {
          headers: { 'user-email': userEmail },
        }
      );
      span.addEvent('Top expensive products retrieved', {
        count: response.data.length,
      });
      this.endSpan(span);
      return response.data;
    } catch (error) {
      this.endSpan(span, error);
      throw error;
    }
  }
}
