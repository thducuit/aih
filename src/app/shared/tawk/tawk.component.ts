import {
  Component,
  Renderer2,
  Inject,
  Input,
  OnInit,
  NgZone,
  PLATFORM_ID,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-tawk',
  templateUrl: './tawk.component.html',
  styleUrls: ['./tawk.component.scss'],
})
export class TawkComponent implements OnInit {
  @Input() id: string;
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document,
    @Inject(PLATFORM_ID) private platformId,
    private zone: NgZone,
  ) {}

  ngOnInit() {
    this.appendScript();
  }

  private appendScript() {
    if (isPlatformBrowser(this.platformId)) {
      const s = this.renderer.createElement('script');
      s.text = `var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
      (function () {
        var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = 'https://embed.tawk.to/${this.id}/default';
        s1.charset = 'UTF-8';
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      })();`;
      this.renderer.appendChild(this.document.body, s);
    }
  }
}
