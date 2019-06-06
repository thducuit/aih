import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './abouts/about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
  	{ path: 'about', component: AboutComponent },
  	{ path: 'contact', component: ContactComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
