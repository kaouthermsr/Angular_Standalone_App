import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { ProductComponent } from './components/product/product.component';

// Exporting routes so it can be used elsewhere
export const routes: Routes = [
  { path: 'users', component: UserComponent },
  { path: 'products', component: ProductComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
