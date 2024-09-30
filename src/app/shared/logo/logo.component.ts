import {
  trigger,
  state,
  style,
  transition,
  animate,
  keyframes,
  stagger,
  query,
} from '@angular/animations';
import {
  ApplicationRef,
  Component,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  afterNextRender,
  afterRender,
} from '@angular/core';
import {
  Subscription,
  first,
  interval,
  switchMap,
  takeUntil,
  tap,
  timer,
} from 'rxjs';

@Component({
  selector: 'logo',
  standalone: true,
  animations: [
    trigger('logo', [
      state(
        'start',
        style({
          stroke: '#00458f',
          fill: '#0074e9',
        })
      ),
      state(
        'end',
        style({
          stroke: '#00458f',
          fill: '#0074e9',
        })
      ),
      transition(
        'start <=> end',
        query(
          '.logo',
          animate(
            '1000ms linear',
            keyframes([
              style({
                stroke: '#00458f',
                fill: 'none',
                strokeDasharray: 10,
                strokeDashoffset: 10,
                offset: 0,
              }),
              style({
                strokeDasharray: 20,
                strokeDashoffset: 10,
                offset: 0.5,
              }),
              style({ strokeDasharray: 5, strokeDashoffset: 0, offset: 0.8 }),
              style({
                strokeDashoffset: 100,
                stroke: '#00458f',
                fill: '#0074e9',
                offset: 1,
              }),
            ])
          )
        )
      ),
    ]),
  ],
  templateUrl: './logo.component.svg',
  styleUrl: './logo.component.scss',
})
export class LogoComponent implements OnInit, OnDestroy {
  @Input() size = 500;
  @Input() animating = true;

  animated = false;
  $subscription$: Subscription = new Subscription();

  constructor(appRef: ApplicationRef, zone: NgZone) {
    if (this.animating) {
      this.$subscription$.add(
        appRef.isStable
          .pipe(
            first((stable) => stable),
            switchMap(() => timer(0, 2000))
          )
          .subscribe((t) =>
            zone.run(() => {
              this.animated = !this.animated;
            })
          )
      );
    }
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.$subscription$.unsubscribe();
  }
}
