import { Component } from '@angular/core';

interface Feature {
  readonly icon: string;
  readonly title: string;
  readonly text: string;
}

/** The light-green "Free Shipping / Easy Returns / Secure Payment / 24/7 Support" strip above the footer. */
@Component({
  selector: 'app-feature-strip',
  templateUrl: './feature-strip.component.html',
})
export class FeatureStripComponent {
  protected readonly features: readonly Feature[] = [
    { icon: 'fa-truck', title: 'Free Shipping', text: 'On orders over 500 EGP' },
    { icon: 'fa-arrow-rotate-left', title: 'Easy Returns', text: '14-day return policy' },
    { icon: 'fa-shield-halved', title: 'Secure Payment', text: '100% secure checkout' },
    { icon: 'fa-headset', title: '24/7 Support', text: 'Contact us anytime' },
  ];
}
