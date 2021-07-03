import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ContactsListComponent } from "./contacts-list.component";
import { ContactsResolverService } from "../services/contacts-resolver.service";

const routes: Routes = [
  {
    path: "",
    component: ContactsListComponent,
    resolve: {
      contacts: ContactsResolverService,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactsListRoutingModule {}
