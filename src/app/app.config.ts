import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withDebugTracing,
  withPreloading
} from '@angular/router';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient, HTTP_INTERCEPTORS, withInterceptorsFromDi} from '@angular/common/http';
import {provideClientHydration} from '@angular/platform-browser';
import {importProvidersFrom} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSidenavModule} from '@angular/material/sidenav';
import {TokenInterceptor} from './interceptors/token.interceptors';
import {AuthGuard} from './guards/authGuard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    // provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync(),
    provideClientHydration(),
    provideRouter(routes, withPreloading(PreloadAllModules),
      withDebugTracing(),),
    provideHttpClient(withInterceptorsFromDi(),),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    importProvidersFrom(ReactiveFormsModule),
    importProvidersFrom(MatSidenavModule),
    AuthGuard
  ],
};
