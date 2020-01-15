import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { UploadProfilePictureComponent } from './upload-profile-picture/upload-profile-picture.component';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AccountPageRoutingModule,
    SharedModule
  ],
  declarations: [AccountPage, UploadProfilePictureComponent, PopoverComponent],
  entryComponents: [UploadProfilePictureComponent, PopoverComponent]
})
export class AccountPageModule {}
