import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";

import { select, Store } from "@ngrx/store";

import { State } from "../../store/reducers/index";
import { areContactsLoaded } from "../store/selector/contact.selectors";
import { loadContacts } from "../store/action/contact.actions";

@Injectable()
export class ContactsResolverService implements Resolve<Observable<any>> {
  constructor(private store: Store<State>) {}

  resolve(): Observable<any> {
    return this.store.pipe(
      select(areContactsLoaded),
      tap((contactsLoaded) => {
        if (!contactsLoaded) {
          this.store.dispatch(loadContacts());
        }
      }),
      filter((contactsLoaded) => contactsLoaded),
      first()
    );
  }
}
