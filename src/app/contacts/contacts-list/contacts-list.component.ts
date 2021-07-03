import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FormControl } from "@angular/forms";
import { Observable, Subject } from "rxjs";

import { Update } from "@ngrx/entity";
import { Store } from "@ngrx/store";

import { State } from "src/app/store/reducers";

import { IContact } from "../../models";
import { getAllContacts } from "../store/selector/contact.selectors";
import { contactActionTypes } from "../store/action/contact.actions";
import { MatPaginator } from "@angular/material/paginator";
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from "rxjs/operators";
import { MatSort } from "@angular/material/sort";
import { MatDialog } from "@angular/material/dialog";
import { ContactsDeleteConfirmComponent } from "../contacts-delete-confirm/contacts-delete-confirm.component";
import { ContactsAddDialogComponent } from "../contacts-add-dialog/contacts-add-dialog.component";

@Component({
  selector: "app-contacts-list",
  templateUrl: "./contacts-list.component.html",
  styleUrls: ["./contacts-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsListComponent implements OnInit, OnDestroy {
  private readonly _destroy$: Subject<boolean> = new Subject<boolean>();

  contacts$: Observable<IContact[]>;
  dataSource: MatTableDataSource<IContact>;
  search: FormControl;
  displayedColumns: string[];
  resultsLength = 0;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private store: Store<State>, public dialog: MatDialog) {
    this.search = new FormControl("");

    this.displayedColumns = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "favourite",
      "details",
      "update",
      "delete",
    ];
  }

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(150),
        // compare objects
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
        tap(
          () => (this.paginator.pageIndex = 0) // we should reset page index
        ),
        takeUntil(this._destroy$)
      )
      .subscribe((search: string) => {
        this.dataSource.filter = search.trim().toLowerCase();
      });

    this.store
      .select(getAllContacts)
      .pipe(takeUntil(this._destroy$))
      .subscribe((contacts: IContact[]) => {
        this.dataSource = new MatTableDataSource(contacts);
        this.dataSource.paginator = this.paginator;
        this.resultsLength = contacts.length;
        this.dataSource.sort = this.sort;
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  addContact(): void {
    const dialogRef = this.dialog.open(ContactsAddDialogComponent);

    dialogRef.afterClosed().subscribe((contact: IContact) => {
      if (contact) {
        this.store.dispatch(contactActionTypes.createContact({ contact }));
      }
    });
  }

  editContact(contact: IContact): void {
    const dialogRef = this.dialog.open(ContactsAddDialogComponent, {
      data: contact,
    });

    dialogRef.afterClosed().subscribe((cnt: IContact) => {
      if (cnt) {
        const update: Update<IContact> = {
          id: contact.id,
          changes: {
            ...cnt,
          },
        };
        this.store.dispatch(contactActionTypes.updateContact({ update }));
      }
    });
  }

  changeStatusFavorite(contact: IContact): void {
    const update: Update<IContact> = {
      id: contact.id,
      changes: {
        ...contact,
        favourite: !contact.favourite,
      },
    };
    this.store.dispatch(contactActionTypes.updateContact({ update }));
  }

  deleteContact(contact: IContact) {
    const dialogRef = this.dialog.open(ContactsDeleteConfirmComponent, {
      data: contact,
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.store.dispatch(
          contactActionTypes.deleteContact({ contactId: contact.id })
        );
      }
    });
  }

  clearInput(): void {
    this.search.patchValue("");
  }
}
