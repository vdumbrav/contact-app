# ContactsApp

Code Challenge - Contacts App

Technologies to be used:

- Angular (v9+) & Material
- NGRx store & Rxjs

The app will have one page, the Contacts Page.

Contact entity contains: firstName, lastName, email, phone, favourite.

Contacts Page needs to contain:

- header with search field + Add Contact button
- table with contacts:
  - columns for each field + Actions for Edit/Delete
  - favourite column with star icon and option to toggle the favourite field
  - Add/Edit Contact dialog
  - confirm Delete Contact dialog

All CRUD actions need to be linked to store;

The following should be used:

- lazy loaded modules
- reactive forms ( + validators for email/phone )
- use of interfaces/services
- use of store
