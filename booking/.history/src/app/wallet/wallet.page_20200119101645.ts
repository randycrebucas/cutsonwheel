import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { PaymentsService } from '../payments/payments.service';
import { AuthService } from '../auth/auth.service';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import { map } from 'rxjs/operators';
import { Payments } from '../payments/payments';
import { Observable } from 'rxjs';
const list = document.getElementById('list');
@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss'],
})
export class WalletPage implements OnInit {
  @ViewChild(IonInfiniteScroll, { static: false}) infiniteScroll: IonInfiniteScroll;
  public payments$: Observable<Payments[]>;
  public user: firebase.User;
  balance: number;
  wallets = [];
  payments: Payments;
  isLoading: boolean;
  length = 0;
  lastVisible: number;
  constructor(
    private paymentsService: PaymentsService,
    private authService: AuthService,
    private toastCtrl: ToastController,
    private renderer: Renderer2
  ) {
    this.isLoading = true;
  }

  ngOnInit() {
    this.authService.getUserState().subscribe((user) => {
      if (user) {
        this.user = user;

        this.getTotalWallet(user.uid);
        this.payments$ = this.paymentsService.getByUserId(user.uid);
      }
    });
  }

  getTotalWallet(userId: string) {
    this.paymentsService.getUserWallet(userId).subscribe((payments) => {
      let balance = 0;
      for (const payment of payments) {
        if (payment.paymentTo === this.user.uid) {
          balance += payment.transactions.amount.total;
        }
      }
      this.balance = balance;
    });
  }

  loadData(event) {
    this.paymentsService.getByUserIdByLastVisible(this.user.uid).subscribe((payments) => {
      console.log(payments)
      if (this.wallets.length < payments.length) {
        console.log('Loading data...');
        event.target.complete();

        payments.forEach(element => {
          this.wallets.push(element);
        });

        console.log('Done');
      } else {
        console.log('No More Data');
        this.toastCtrl.create({
          message: 'All transaction loaded!',
          duration: 2000
        }).then(toast => toast.present());
        event.target.disabled = true;
      }

    });
  }
}
