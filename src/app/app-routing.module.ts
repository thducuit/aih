import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './containers/home/home.component';
import {AboutComponent} from './containers/abouts/about/about.component';

import {HomeLayoutComponent} from './layouts/home-layout/home-layout.component';
import {PageLayoutComponent} from './layouts/page-layout/page-layout.component';

const routes: Routes = [
  {
    path: '',
    component: HomeLayoutComponent,
    children: [
      {path: '', component: HomeComponent, pathMatch: 'full'}
    ]
  },
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      {path: 'about', component: AboutComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
