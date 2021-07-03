import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { IContact } from 'src/app/models';
import { contactActionTypes } from '../action/contact.actions';

export interface ContactState extends EntityState<IContact> {
  contactsLoaded: boolean;
}

export const adapter: EntityAdapter<IContact> = createEntityAdapter<IContact>();

export const initialState = adapter.getInitialState({
  contactsLoaded: false
});

export const courseReducer = createReducer(
  initialState,

  on(contactActionTypes.contactsLoaded, (state, action) => {
    return adapter.setAll(
      action.contacts,
      {...state, contactsLoaded: true}
    );
  }),

  on(contactActionTypes.createContact, (state, action) => {
    return adapter.addOne(action.contact, state);
  }),

  on(contactActionTypes.updateContact, (state, action) => {
    return adapter.updateOne(action.update, state);
  }),

  on(contactActionTypes.deleteContact, (state, action) => {
    return adapter.removeOne(action.contactId, state);
  }),
);

export const { selectAll, selectIds } = adapter.getSelectors();