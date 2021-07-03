import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { IContact } from "src/app/models";

import { AppErrorStateMatcher } from "../../helpers";

@Component({
  selector: "app-contacts-add-dialog",
  templateUrl: "./contacts-add-dialog.component.html",
  styleUrls: ["./contacts-add-dialog.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactsAddDialogComponent implements OnInit {
  form: FormGroup;
  matcher = new AppErrorStateMatcher();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IContact,
    private readonly _fb: FormBuilder,
    public dialogRef: MatDialogRef<ContactsAddDialogComponent>
  ) {
    this.form = this._fb.group({
      firstName: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      lastName: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      phone: [
        "",
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
      email: ["", [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.form.patchValue(this.data);
  }

  get firstName(): FormControl {
    return this.form.get("firstName") as FormControl;
  }

  get lastName(): FormControl {
    return this.form.get("lastName") as FormControl;
  }

  get phone(): FormControl {
    return this.form.get("phone") as FormControl;
  }

  get email(): FormControl {
    return this.form.get("email") as FormControl;
  }

  submit(): void {
    this.dialogRef.close(this.form.value);
  }
}
