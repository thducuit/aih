import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateUniversalLoader } from './shared/translate-universal-loader';

export function createTranslateLoader() {
  const path = './dist/browser/assets/i18n';
  return new TranslateUniversalLoader(path, '.json');
}

@NgModule({
  imports: [
    BrowserModule.withServerTransition({
      appId: 'aih-app'
    }),
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [],
      },
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
