import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  irFacebook(){
    window.open('');
  }

  irInstagram(){
    window.open('');
  }

  irWhatsapp() {
    window.open('');
  }
}
