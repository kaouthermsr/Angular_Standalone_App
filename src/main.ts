import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter, withDebugTracing } from '@angular/router';
import { routes } from './app/app.routes';
import { configureOpenTelemetry } from './app/opentelemetry-config';

configureOpenTelemetry();

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes, withDebugTracing())], // Correct routing setup
}).catch((err) => console.error(err));
