import { createAction, props } from "@ngrx/store";
import { Update } from "@ngrx/entity";

import { IContact } from "../../../models";

export const loadContacts = createAction(
  "[Contacts List] Load Contacts via Service"
);

export const contactsLoaded = createAction(
  "[Contacts Effect] Contacts Loaded Successfully",
  props<{ contacts: IContact[] }>()
);

export const createContact = createAction(
  "[Create Contact Component] Create IContact",
  props<{ contact: IContact }>()
);

export const deleteContact = createAction(
  "[Contacts List Operations] Delete IContact",
  props<{ contactId: string }>()
);

export const updateContact = createAction(
  "[Contacts List Operations] Update IContact",
  props<{ update: Update<IContact> }>()
);

export const contactActionTypes = {
  loadContacts,
  contactsLoaded,
  createContact,
  deleteContact,
  updateContact,
};
