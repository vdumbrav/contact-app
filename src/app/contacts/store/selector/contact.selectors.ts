import { createSelector, createFeatureSelector } from "@ngrx/store";

import { ContactState, selectAll } from "../reducer/contact.reducer";

export const contactFeatureSelector =
  createFeatureSelector<ContactState>("contacts");

export const getAllContacts = createSelector(contactFeatureSelector, selectAll);

export const areContactsLoaded = createSelector(
  contactFeatureSelector,
  (state) => state.contactsLoaded
);
