import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserProfile {
    id: string;
    username: string;
    balance: number;
}

@Injectable({ providedIn: 'root' })
export class UserService {

    private readonly STORAGE_KEY = 'catfish_user_balance';
    private readonly DEFAULT_BALANCE = 1000.00;

    private _user$ = new BehaviorSubject<UserProfile>({
        id: 'user_001',
        username: 'Player',
        balance: this.loadBalance()
    });

    user$: Observable<UserProfile> = this._user$.asObservable();

    get user(): UserProfile { return this._user$.getValue(); }
    get balance(): number { return this._user$.getValue().balance; }

    private loadBalance(): number {
        try {
            const stored = localStorage.getItem(this.STORAGE_KEY);
            return stored !== null ? parseFloat(stored) : this.DEFAULT_BALANCE;
        } catch {
            return this.DEFAULT_BALANCE;
        }
    }

    private persist(balance: number): void {
        try { localStorage.setItem(this.STORAGE_KEY, balance.toFixed(2)); } catch { }
    }

    private update(newBalance: number): void {
        const next: UserProfile = { ...this._user$.getValue(), balance: newBalance };
        this._user$.next(next);
        this.persist(newBalance);
    }

    deductBet(amount: number): boolean {
        if (amount > this.balance) return false;
        this.update(parseFloat((this.balance - amount).toFixed(2)));
        return true;
    }

    // Keep signature so existing calls don't break — but does nothing
    creditWinnings(_amount: number): void { }
    addFunds(_amount: number): void { }
    setBalance(_amount: number): void { }
}