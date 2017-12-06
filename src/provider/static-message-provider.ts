import { Injectable } from '@angular/core';
import { MessageProvider } from './message-provider';
import { defaultValidationMessages } from './default-validation-messages';
import { ErrorFormatRule } from '../parser/errorformatrule';
import { PlaceHolders } from './default-validation-placeholders';

@Injectable()
export class StaticMessageProvider implements MessageProvider {

    getMessage(errorKey: string): string {
        return this.getErrorMessage(errorKey);
    }
    getAttribute(attribute: string): string {
        return this.getAttributePlaceHolder(attribute);
    }

    getPlaceHolders(errorKey: string): ErrorFormatRule {
        return PlaceHolders.find(x => x.errorKey === errorKey);
    }


    private getAttributePlaceHolder(attribute: string): string {
        if (this.containsCustomAttribute(attribute)) { // Custom has priority
            return this.getCustomAttributes(attribute);
        }
        return attribute;
    }

    private getErrorMessage(errorKey: string): string {
        if (errorKey === 'customAttributes') {
            throw new SyntaxError('customAttributes is reserved');
        }
        return defaultValidationMessages[errorKey];
    }

    private containsCustomAttribute(attribute: string): boolean {
        return !!this.getCustomAttributes(attribute);
    }

    private getCustomAttributes(attribute: string): string {
        return this.customAttributes[attribute];
    }

    private get customAttributes(): any {
        return defaultValidationMessages['customAttributes'];
    }

}