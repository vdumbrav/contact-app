import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "contacts",
    pathMatch: "full",
  },
  {
    path: "contacts",
    loadChildren: () =>
      import("./contacts/contacts.module").then((m) => m.ContactsModule),
  },
  {
    path: "**",
    redirectTo: "contacts",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
