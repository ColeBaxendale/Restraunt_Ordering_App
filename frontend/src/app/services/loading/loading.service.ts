import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loading!: boolean;
  private loadingItem!: string;

  constructor() {}

  setLoading(loading: boolean, loadingItem: string) {
    this.loading = loading;
    this.loadingItem = loadingItem
  }

  getLoading(): boolean {
    return this.loading;
  }

  getLoadingItem(): string {
    return this.loadingItem;
  }
}

