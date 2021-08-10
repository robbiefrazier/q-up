import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private curentUser: BehaviorSubject<any> = new BehaviorSubject(null);

  private supabase: SupabaseClient;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  router: any;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

    // Try to recover our user session
    this.loadUser();

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        this.curentUser.next(session.user);
      } else {
        this.curentUser.next(false);
      }
    });
  }

  async loadUser() {
    const user = await this.supabase.auth.user();

    if (user) {
      this.curentUser.next(user);
    } else {
      this.curentUser.next(false);
    }
  }

  get currentUser(): Observable<User> {
    return this.curentUser.asObservable();
  }

  async signUp(credentials: { email; password; phone }) {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.supabase.auth.signUp(credentials);
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }

  signIn(credentials: { email; password; phone }) {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.supabase.auth.signIn(credentials);
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }

  signOut() {
    this.supabase.auth.signOut().then(_ => {
      // Clear up and end all active subscriptions!
      this.supabase.getSubscriptions().map(sub => {
        this.supabase.removeSubscription(sub);
      });

      this.router.navigateByUrl('/');
    });
  }
}
