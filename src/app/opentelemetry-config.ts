import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { XMLHttpRequestInstrumentation } from '@opentelemetry/instrumentation-xml-http-request';

export function configureOpenTelemetry() {
  // Initialize a tracer provider
  const provider = new WebTracerProvider();

  // Create Exporters
  const consoleExporter = new ConsoleSpanExporter();
  const zipkinExporter = new ZipkinExporter({
    url: 'http://localhost:9411/api/v2/spans',
    serviceName: 'angular-frontend',
  });

  // Add processors
  provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));
  provider.addSpanProcessor(new SimpleSpanProcessor(zipkinExporter));

  // Register the provider globally
  provider.register();

  // Register automatic instrumentations
  registerInstrumentations({
    instrumentations: [
      new DocumentLoadInstrumentation(),
      new XMLHttpRequestInstrumentation(),
    ],
  });

  console.log('OpenTelemetry Initialized');
}
