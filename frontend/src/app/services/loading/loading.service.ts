import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading!: boolean;
  private loadingItem!: string;
  public loadingState = new BehaviorSubject<boolean>(false);
  public loadingItemState = new BehaviorSubject<string>('');

  loadingItemState$ = this.loadingItemState.asObservable();
  loadingState$ = this.loadingState.asObservable();

  constructor() {}

  setLoading(loading: boolean, loadingItem: string) {
    this.loading = loading;
    this.loadingState.next(loading);
    this.loadingItem = loadingItem
    this.loadingItemState.next(loadingItem);
  }

  getLoading(): boolean {
    return this.loading;
  }

  getLoadingItem(): string {
    return this.loadingItem;
  }
}

