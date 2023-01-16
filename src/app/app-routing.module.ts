import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KeyboardsComponent } from './keyboards/keyboards.component';
import { KeyboardDetailComponent } from './keyboard-detail/keyboard-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [ { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
{ path: 'detail/:id', component: KeyboardDetailComponent },
{ path: 'keyboards', component: KeyboardsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
