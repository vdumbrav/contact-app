import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";

import { ContactsListRoutingModule } from "./contacts-list-routing.module";
import { ContactsListComponent } from "./contacts-list.component";

@NgModule({
  declarations: [ContactsListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactsListRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,MatSortModule
  ],
})
export class ContactsListModule {}
