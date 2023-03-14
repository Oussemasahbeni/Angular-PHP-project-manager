import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ViewprojectsComponent } from './viewprojects/viewprojects.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTablesModule } from 'angular-datatables';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ButtonModule } from 'primeng/button';
import { EditprojectsComponent } from './editprojects/editprojects.component';
import { ViewtasksComponent } from './viewtasks/viewtasks.component';
import { ViewmembersComponent } from './viewmembers/viewmembers.component';
import { EdittasksComponent } from './edittasks/edittasks.component';
import { EditmembersComponent } from './editmembers/editmembers.component';
import { AddprojectsComponent } from './addprojects/addprojects.component';
import { AddmembersComponent } from './addmembers/addmembers.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Routes } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormField, matFormFieldAnimations, MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddtasksComponent } from './addtasks/addtasks.component';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { Ng5SliderModule } from 'ng5-slider';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FilterPipe, FilterPipeModule } from 'ngx-filter-pipe';





const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'add-projects', component: AddprojectsComponent },
  { path: 'view-projects', component: ViewprojectsComponent },
  { path: 'edit-projects/:id', component: EditprojectsComponent },
  { path: 'view-members/:id', component: ViewmembersComponent },
  { path: 'add-members/:id', component: AddmembersComponent },
  { path: 'edit-members/:Project_id/:memberID', component: EditmembersComponent },
  { path: 'view-tasks/:Project_id/:memberID', component: ViewtasksComponent },
  { path: 'add-tasks/:Project_id/:memberID', component: AddtasksComponent },
  { path: 'edit-tasks/:Project_id/:memberID/:taskID', component: EdittasksComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent }


];


@NgModule({
  declarations: [
    AppComponent,
    ViewprojectsComponent,
    EditprojectsComponent,
    ViewtasksComponent,
    ViewmembersComponent,
    EdittasksComponent,
    EditmembersComponent,
    AddprojectsComponent,
    AddmembersComponent,
    AddtasksComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,






  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    NgxDatatableModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    [RouterModule.forRoot(routes, { useHash: true })],
    MatPaginatorModule,
    NgxPaginationModule,
    MatSortModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    Ng5SliderModule,
    SweetAlert2Module,
    FilterPipeModule











  ],






  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
