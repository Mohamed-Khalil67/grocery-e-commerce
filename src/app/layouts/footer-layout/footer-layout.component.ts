import { Component } from '@angular/core';
import { FeatureStripComponent } from './feature-strip/feature-strip.component';
import { FooterComponent } from './footer/footer.component';

/** Bottom of every page: "Free shipping / Easy returns / ..." strip + footer. */
@Component({
  imports: [FeatureStripComponent, FooterComponent],
  selector: 'app-footer-layout',
  styleUrl: './footer-layout.component.css',
  templateUrl: './footer-layout.component.html',
})
export class FooterLayoutComponent {}
