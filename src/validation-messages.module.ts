import { NgModule, ModuleWithProviders } from '@angular/core';
import { ValidationMessagesService } from './validation-messages.service';

import { MessageProvider, StaticMessageProvider } from './provider';

export function messageProviderFactory() {
    return new StaticMessageProvider();
}

@NgModule({
    imports: [],
    exports: [],
    declarations: []
})
export class ValidationMessagesModule {
    static forRoot(messageProvider: any = {
        provide: MessageProvider,
        useFactory: messageProviderFactory
    }): ModuleWithProviders {
        return {
            ngModule: ValidationMessagesModule,
            providers: [messageProvider, ValidationMessagesService]
        };
    }
}
