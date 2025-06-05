import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()),      // 👈   SOLO ESTA LÍNEA
    importProvidersFrom(FormsModule),    // 👈   y SOLO una vez

    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};

