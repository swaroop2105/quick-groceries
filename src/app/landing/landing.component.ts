import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
  features = [
    {
      title: 'Easy to Use',
      description: 'Quickly add items and generate grocery lists.'
    },
    {
      title: 'Organized',
      description: 'Organize your groceries into categories like fruits, vegetables, and spices.'
    },
    {
      title: 'Mobile Friendly',
      description: 'Access your grocery list anytime, anywhere.'
    }
  ];
}
