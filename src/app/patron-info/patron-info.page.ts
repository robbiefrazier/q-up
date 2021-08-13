import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-patron-info',
  templateUrl: './patron-info.page.html',
  styleUrls: ['./patron-info.page.scss'],
})
export class PatronInfoPage implements OnInit {
  supabase: SupabaseClient;
  email: any;
  phoneNum: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        //Get user email, phone and location selection from Map page
        this.email = this.router.getCurrentNavigation().extras.state.userEmail;
      }
    });
  }

  ngOnInit() {
  }

  numberOnlyValidation(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

  keyPressAlpha(event) {

    const inp = String.fromCharCode(event.keyCode);

    if (/[a-zA-Z ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }
  async patInfo(){
    const { data, error } = await this.supabase.from('Users')
    .update({ phone: this.phoneNum })
    .eq('email', this.email);
  }
}
