import { ErrorFormatRule } from './errorformatrule';
import { MessageProvider } from '../provider';

export class MessageParser {
    errorMessage: string;
    errorKey: string;

    constructor(
        private errors: any,
        private messageProvider: MessageProvider) {
        this.errorKey = Object.keys(errors)[0];
    }

    parse(attribute: string): string {
        return this.parseAttributePlaceHolders(attribute).parseErrorPlaceholders();
    }

    private parseAttributePlaceHolders(attribute: string): MessageParser {
        const attributePlaceHolder = this.messageProvider
            .getAttribute(attribute);
        this.errorMessage = this.messageProvider
            .getMessage(this.errorKey)
            .replace(':attribute', attributePlaceHolder);
        return this;
    }

    private getPlaceHolders(errorKey: string, error: any): ErrorFormatRule {
        const errorPlaceholder = this.messageProvider.getPlaceHolders(errorKey);
        if (errorPlaceholder) {
            return errorPlaceholder;
        }
        throw SyntaxError(`The ${errorKey} isn't a validation rule`);
    }

    private parseErrorPlaceholders(): string {
        let placeHolders = this.getPlaceHolders(this.errorKey, this.errors);
        return ErrorPlaceholderParser
        .parse(this.errorMessage)
        .with(this.errorKey, this.errors, placeHolders);
    }
}

class ErrorPlaceholderParser {
    private error: any;
    static parse(errorMessage: string): ErrorPlaceholderParser {
        return new ErrorPlaceholderParser(errorMessage);
    }

    private constructor(private errorMessage: string) { }

    with(errorKey: string, error: any, placeHolders: ErrorFormatRule): string {
        this.error = error;
        this.errorMessage = this.parseErrorMessage(placeHolders);
        return this.errorMessage;
    }

    parseErrorMessage(errorFormatRule: ErrorFormatRule): string {
        if (errorFormatRule.placeholders) {
            return Object.keys(errorFormatRule.placeholders)
                .map((placeholder) => {
                    const valueRule = errorFormatRule.placeholders[placeholder];
                    const errorValue = this.error[errorFormatRule.errorKey][valueRule];
                    return this.errorMessage.replace(placeholder, errorValue);
                })[0];
        } else { // if no placeholders, return the same error message
            return this.errorMessage;
        }
    }
}




