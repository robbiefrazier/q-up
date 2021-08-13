import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonRadioGroup, LoadingController } from '@ionic/angular';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { SupabaseService } from '../services/supabase.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  //Get value on ionChange on IonRadioGroup
  selectedRadioGroup: any;
  //Get value on ionSelect on IonRadio item
  selectedRadioItem: any;

  supabase: SupabaseClient;
  email: string;
  pass: string;

  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private supabaseService: SupabaseService,
  ) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
      autoRefreshToken: true,
      persistSession: true
    });
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  radioGroupChange(event) {
    console.log('radioGroupChange',event.detail);
    this.selectedRadioGroup = event.detail;
  }

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.supabaseService.signUp(this.credentials.value).then(async data => {
      await loading.dismiss();
      this.showError('Signup success', 'Please confirm your email now!');
      this.addNewUser();
      }, async err => {
      await loading.dismiss();
      const alert = await this.alertController.create({
        header: 'Registration failed',
        message: 'Incorrect Input',
        buttons: ['OK'],
      });
      await alert.present();
    });
  }

  async showError(title, msg) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }
  async addNewUser() {
    const { data, error } = await this.supabase.from('Users').insert([
    { email: this.email, password: this.pass, userType: this.selectedRadioGroup.value },
  ]);
  }
}
