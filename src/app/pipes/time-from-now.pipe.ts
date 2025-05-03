import { ChangeDetectorRef, inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFromNow',
  pure: false
})
export class TimeFromNowPipe implements PipeTransform, OnDestroy {
  private cd = inject(ChangeDetectorRef)
  private interval: any;

  constructor() {
    this.interval = setInterval(() => {
      this.cd.detectChanges();
    }, 1000);
  }

  transform(value: string, ...args: unknown[]) {
    const now = new Date();
    const secondDate = new Date(value);
    let diff = secondDate.getTime() - now.getTime();
    if (diff < 0) {
      return "Ready";
    }

    diff = Math.abs(diff);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const parts = [];
    if (hours > 0) {
      parts.push(hours.toString().padStart(2, '0'));
    }
    parts.push(minutes.toString().padStart(2, '0'));
    parts.push(seconds.toString().padStart(2, '0'));

    return `${parts.join(':')}`;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}