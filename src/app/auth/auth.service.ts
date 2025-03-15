import { Injectable } from '@angular/core';
import { CHECKSUM } from './login/auth.constant';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedInFlag = false;

  constructor() { }

  validatePin(pin: string): boolean {
    // Decrypt the stored PIN and compare
    const bytes = CryptoJS.AES.decrypt(CHECKSUM, this.sc());
    const decryptedPin = bytes.toString(CryptoJS.enc.Utf8);

    if (decryptedPin === pin) {
      this.isLoggedInFlag = true;
      return true;
    }

    this.isLoggedInFlag = false;
    return false;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInFlag;
  }

  setLoggedIn(status: boolean): void {
    this.isLoggedInFlag = status;
  }

  sc() {
    let chars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't'];
    let result = '';
    let seed = 40;

    for (let i = 0; i < 20; i++) {
      result += chars[(seed + i * 2) % chars.length];
    }

    return result;
  }
}