import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { filter } from 'rxjs/operators';
import { Notification, NotificationType } from '@app/core/models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private subject = new Subject<Notification>();
  private keepAfterRouteChange = false;
  constructor(private router: Router) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
          if (this.keepAfterRouteChange) {
              // only keep for a single route change
              this.keepAfterRouteChange = false;
          } else {
              // clear alert messages
              this.clear();
          }
      }
    });
  }

  // subscribe to alerts
  getNotification(notificationId?: string): Observable<any> {
    return this.subject.asObservable().pipe(
      filter((x: Notification) => x && x.notificationId === notificationId)
    );
  }

  // convenience methods
  success(message: string) {
    this.notify(new Notification({ message, type: NotificationType.Success }));
  }

  error(message: string) {
    this.notify(new Notification({ message, type: NotificationType.Error }));
  }

  info(message: string) {
    this.notify(new Notification({ message, type: NotificationType.Info }));
  }

  warn(message: string) {
    this.notify(new Notification({ message, type: NotificationType.Warning }));
  }

  // main alert method
  notify(notify: Notification) {
    this.keepAfterRouteChange = notify.keepAfterRouteChange;
    this.subject.next(notify);
  }

  // clear alerts
  clear(notificationId?: string) {
    this.subject.next(new Notification({ notificationId }));
  }
}
