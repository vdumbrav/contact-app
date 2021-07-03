import { contactActionTypes } from "../action/contact.actions";
import { ContactsService } from "../../services/contacts.service";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs/operators";
import { Injectable } from "@angular/core";

@Injectable()
export class ContactEffects {
  constructor(
    private readonly _contactsService: ContactsService,
    private actions$: Actions
  ) {}

  loadContacts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(contactActionTypes.loadContacts),
      concatMap(() => this._contactsService.getContacts()),
      map((contacts) => contactActionTypes.contactsLoaded({ contacts }))
    );
  });

  createContact$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(contactActionTypes.createContact),
        concatMap((action) =>
          this._contactsService.createContact(action.contact)
        )
      );
    },
    { dispatch: false }
  );

  updateContact$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(contactActionTypes.updateContact),
        concatMap((action) =>
          this._contactsService.editContact(action.update.id, action.update.changes)
        )
      );
    },
    { dispatch: false }
  );

  deleteContact$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(contactActionTypes.deleteContact),
        concatMap((action) =>
          this._contactsService.deleteContact(action.contactId)
        )
      );
    },
    { dispatch: false }
  );
}
