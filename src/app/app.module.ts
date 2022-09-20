import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
// styles
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {MatInputModule} from '@angular/material/input';
import { UploadComponent } from './upload/upload.component';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { MyVideosComponent } from './my-videos/my-videos.component';
import { EditVideoComponent } from './edit-video/edit-video.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { IncomeComponent } from './income/income.component';
import {MatDividerModule} from '@angular/material/divider';
import { PlayerComponent } from './player/player.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { WithdrawBankComponent } from './withdraw-bank/withdraw-bank.component';
import {MatTabsModule} from '@angular/material/tabs';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { ManageVideosComponent } from './admin/manage-videos/manage-videos.component';
import { ManageAdminsComponent } from './admin/manage-admins/manage-admins.component';
import { ManageECPMSComponent } from './admin/manage-e-cpms/manage-e-cpms.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MyWithdrawalComponent } from './my-withdrawal/my-withdrawal.component';
import { NbThemeModule, NbLayoutModule, NbCardModule, NbButtonModule, NbMenuModule, NbContextMenuModule, NbIconModule, NbSearchModule, NbActionsModule, NbUserModule, NbSidebarModule, NbStepperModule, NbRadioModule, NbDialogModule, NbSelectModule, NbToastrModule, NbToastrService, NbFormFieldModule, NbInputModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { AdminHomePageComponent } from './admin/admin-home-page/admin-home-page.component';
import { AdminRoutingModule } from './admin/admin-routing/admin-routing.module';
import { SearchBiIdComponent } from './admin/search-bi-id/search-bi-id.component';
import { ManagePaymentsComponent } from './admin/manage-payments/manage-payments.component';
import { NotificationsuiComponent } from './notificationsui/notificationsui.component';
import { TermsComponent } from './terms/terms.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    UploadComponent,
    MyVideosComponent,
    EditVideoComponent,
    IncomeComponent,
    PlayerComponent,
    WithdrawBankComponent,
    AdminHomeComponent,
    AdminHeaderComponent,
    ManageVideosComponent,
    ManageAdminsComponent,
    ManageECPMSComponent,
    AddAdminComponent,
    AdminLoginComponent,
    MyWithdrawalComponent,
    ReportDialogComponent,
    AdminHomePageComponent,
    SearchBiIdComponent,
    ManagePaymentsComponent,
    NotificationsuiComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    AdminRoutingModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatPasswordStrengthModule,
    MatCardModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDialogModule,
    MatExpansionModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbCardModule,
    NbButtonModule,
    NbMenuModule.forRoot(),
    NbContextMenuModule,
    NbEvaIconsModule,
    NbIconModule,
    NbSearchModule,
    NbActionsModule,
    NbUserModule,
    NbLayoutModule,
    NbThemeModule,
    NbSidebarModule.forRoot(),
    NbStepperModule,
    NbRadioModule,
    NbDialogModule,
    NbSelectModule,
    NbToastrModule.forRoot(),
    NbFormFieldModule,
    NbInputModule
  ],
  providers: [NbToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
