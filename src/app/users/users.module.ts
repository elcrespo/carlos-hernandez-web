import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersSearchComponent } from './components/users-search/users-search.component';
import { UsersSearchFormComponent } from './components/users-search-form/users-search-form.component';
import { UsersSearchResultsComponent } from './components/users-search-results/users-search-results.component';
import {ReactiveFormsModule} from "@angular/forms";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    UsersComponent,
    UsersSearchComponent,
    UsersSearchFormComponent,
    UsersSearchResultsComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule
  ]
})
export class UsersModule { }
