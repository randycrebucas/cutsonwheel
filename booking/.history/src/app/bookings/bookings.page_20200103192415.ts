import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Bookings } from './bookings';
import { BookingsService } from './bookings.service';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { map, switchMap } from 'rxjs/operators';
import { OffersService } from '../services/offers/offers.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss']
})
export class BookingsPage implements OnInit {
  isLoading = false;
  userInfo: any;

  public loadedBookings$: Observable<Bookings[]>;

  constructor(
    private bookingService: BookingsService,
    private offersService: OffersService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    let loadedBooking;
    const currenctUser = this.authService.getUsersProfile();
    if (currenctUser) {
      this.userService.getUser(currenctUser.uid).subscribe((profile) => {
        this.userInfo = { profile, ...currenctUser };
        if (this.userInfo.profile.role === 'assistant') {
          /** assistant */
          loadedBooking = this.bookingService.getBookingsByAssistant(currenctUser.uid).pipe(
            switchMap((booking) => {
              return this.offersService.getOffer(booking.assistant.offerId);
            })
          );
        } else {
          /** client */
          loadedBooking = this.bookingService.getBookingsByClient(currenctUser.uid).pipe(
            switchMap((booking) => {
              console.log(booking);
              return booking;
              // return this.userService.getUser(booking.assistant.assisstantId);
            })
          );
        }
        loadedBooking.subscribe((res) => {

          console.log(res);
        });
        this.loadedBookings$ = loadedBooking;
      });
    }
  }

  ionViewWillEnter() {

  }

  onCancelBooking(bookingId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl.create({ message: 'Cancelling...' }).then(loadingEl => {
      loadingEl.present();
      this.bookingService.deleteBooking(bookingId).then(() => {
        loadingEl.dismiss();
      });
    });
  }

}
