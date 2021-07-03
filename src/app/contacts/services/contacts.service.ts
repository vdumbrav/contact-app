import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

import { IContact } from "../../models";

@Injectable()
export class ContactsService {
  private contactsUrl = "api/contacts/";
  constructor(private http: HttpClient) {}

  getContacts(): Observable<IContact[]> {
    return this.http.get<IContact[]>(this.contactsUrl).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  createContact(contact: IContact): Observable<IContact> {
    return this.http.post<IContact>(this.contactsUrl, contact).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  editContact(contactId: string | number, changes: Partial<IContact>): Observable<any> {
    return this.http.put(this.contactsUrl + contactId, changes);
  }

  deleteContact(id: string): Observable<any> {
    return this.http.delete(this.contactsUrl + id);
  }
}
