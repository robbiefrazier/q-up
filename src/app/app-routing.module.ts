import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'reset',
    loadChildren: () => import('./reset/reset.module').then( m => m.ResetPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then( m => m.MapPageModule)
  },
  {
    path: 'list-view',
    loadChildren: () => import('./list-view/list-view.module').then( m => m.ListViewPageModule)
  },
  {
    path: 'patron',
    loadChildren: () => import('./patron/patron.module').then( m => m.PatronPageModule)
  },
  {
    path: 'patron-waitlist',
    loadChildren: () => import('./patron-waitlist/patron-waitlist.module').then( m => m.PatronWaitlistPageModule)
  },
  {
    path: 'patron-info',
    loadChildren: () => import('./patron-info/patron-info.module').then( m => m.PatronInfoPageModule)
  },
  {
    path: 'restaurant-info',
    loadChildren: () => import('./restaurant-info/restaurant-info.module').then( m => m.RestaurantInfoPageModule)
  },
   {
    path: 'restaurant-waitlist',
    loadChildren: () => import('./restaurant-waitlist/restaurant-waitlist.module').then( m => m.RestaurantWaitlistPageModule)
  },
  {
    path: 'floorplan',
    loadChildren: () => import('./floorplan/floorplan.module').then( m => m.FloorplanPageModule)
  },
  {
    path: 'restaurant-function',
    loadChildren: () => import('./restaurant-function/restaurant-function.module').then( m => m.RestaurantFunctionPageModule)
  },  {
    path: 'patron-tableready',
    loadChildren: () => import('./patron-tableready/patron-tableready.module').then( m => m.PatronTablereadyPageModule)
  },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
