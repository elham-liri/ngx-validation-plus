import { ErrorFormatRule } from '../parser/errorformatrule';

export abstract class MessageProvider {
    abstract getMessage(errorKey: string): string;
    abstract getAttribute(attribute: string): string;
    abstract getPlaceHolders(errorKey: string): ErrorFormatRule;
}