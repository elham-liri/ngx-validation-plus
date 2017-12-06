import { ErrorFormatRule } from '../parser/errorformatrule';

export const PlaceHolders: ErrorFormatRule[] = [
    {
        errorKey: 'minlength',
        placeholders: {
            ':min': 'requiredLength'
        }
    },
    {
        errorKey: 'maxlength',
        placeholders: {
            ':max': 'requiredLength'
        }
    },
    { errorKey: 'required' },
    { errorKey: 'pattern' }
];

