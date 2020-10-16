import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  cookieExists: boolean;
  constructor(private router: Router, private tokenService: StorageService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.tokenService.getToken()) {
      if (this.tokenService.getUser().userId) return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
