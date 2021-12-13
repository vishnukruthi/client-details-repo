import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedCoreApiModule } from '@demo-repo/shared/core-api';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  { path:'', pathMatch: "full", redirectTo: 'client-list'},
  {
    path: 'client-list',
    loadChildren: () =>
      import('@demo-repo/client-report/views').then(
        (m) => m.ClientReportViewsModule
      ),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    SharedCoreApiModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
