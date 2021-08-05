import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patron-info',
  templateUrl: './patron-info.page.html',
  styleUrls: ['./patron-info.page.scss'],
})
export class PatronInfoPage implements OnInit {

  constructor() { }

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

}
