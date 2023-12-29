import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimations(), AuthService],

};
