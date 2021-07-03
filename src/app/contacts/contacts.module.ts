import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

import { ContactsRoutingModule } from "./contacts-routing.module";
import { ContactsComponent } from "./contacts.component";
import { ContactsService } from "./services/contacts.service";
import { courseReducer } from "./store/reducer/contact.reducer";
import { ContactEffects } from "./store/effects/contact.effects";
import { ContactsResolverService } from "./services/contacts-resolver.service";
import { ContactsDeleteConfirmComponent } from "./contacts-delete-confirm/contacts-delete-confirm.component";
import { ContactsAddDialogComponent } from './contacts-add-dialog/contacts-add-dialog.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ContactsComponent, ContactsDeleteConfirmComponent, ContactsAddDialogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactsRoutingModule,
    StoreModule.forFeature("contacts", courseReducer),
    EffectsModule.forFeature([ContactEffects]),
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [ContactsService, ContactsResolverService],
})
export class ContactsModule {}
