import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { ApiService } from '../../core/api.service';
import { Membership } from '../membership-upsert/membership';

@Injectable({
  providedIn: 'root',
})
export class MembershipService extends ApiService {
  API_URL: string = `${this.BASE_URL}/membership`;

  $memberships: BehaviorSubject<Membership[]> = new BehaviorSubject<
    Membership[]
  >([]);

  get memberships$(): Observable<Membership[]> {
    return this.$memberships.asObservable();
  }

  getAllMemberships(): Observable<Membership[]> {
    return this.http
      .get<Membership[]>(this.API_URL, this.httpOptions)
      .pipe(catchError(this.errorHandler));
  }

  getMembershipById(membershipId: number | string) {
    this.$subscriptions$.add(
      this.http
        .get<Membership>(this.API_URL)
        .pipe(catchError(this.errorHandler))
        .subscribe((membership: Membership) => {
          this.$memberships.next([...this.$memberships.getValue(), membership]);
        })
    );
  }

  selectAllMembershipsDummy(): void {
    this.$subscriptions$.add(
      this.getAllMemberships().subscribe((memberships: Membership[]) => {
        this.$memberships.next(memberships);
      })
    );
  }
}
