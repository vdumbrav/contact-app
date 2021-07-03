import {
  Component,
  ChangeDetectionStrategy,
  Inject,
} from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

import { IContact } from "../../models";

@Component({
  selector: "app-contacts-delete-confirm",
  templateUrl: "./contacts-delete-confirm.component.html",
  styleUrls: ["./contacts-delete-confirm.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsDeleteConfirmComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IContact) {}
}
