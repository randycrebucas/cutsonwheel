import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPagePage } from './tabs-page.page';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPagePage,
    children: [
      {
        path: 'news',
        canActivate: [AngularFireAuthGuard],
        loadChildren: () => import('./../news/news.module').then( m => m.NewsPageModule)
      },
      {
        path: 'services',
        loadChildren: () => import('./../services/services.module').then( m => m.ServicesPageModule)
      },
      {
        path: 'bookings',
        canActivate: [AngularFireAuthGuard],
        loadChildren: () => import('./../bookings/bookings.module').then( m => m.BookingsPageModule)
      },
      {
        path: 'payments',
        canActivate: [AngularFireAuthGuard],
        loadChildren: () => import('./../payments/payments.module').then( m => m.PaymentsPageModule)
      },
      {
        path: 'wallet',
        canActivate: [AngularFireAuthGuard],
        loadChildren: () => import('./../wallet/wallet.module').then( m => m.WalletPageModule)
      },
      {
        path: 'profiles',
        canActivate: [AngularFireAuthGuard],
        loadChildren: () => import('./../profiles/profiles.module').then( m => m.ProfilesPageModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [
    AngularFireAuthGuard
  ],
})
export class TabsPagePageRoutingModule {}
