import { DATA_TYPES_RULES } from "../utils/constants";

/**
 * Interface representing form validation errors.
 * Each key is a form field name, and the value is either a string error message or undefined if the field is valid.
 */
export interface FormErrors {
    [key: string]: string | undefined;
}

/**
 * Validates a single form field based on its data type and constraints.
 * It checks the value against the regex pattern defined in `DATA_TYPES_RULES`, length, and numeric constraints.
 * It also handles file inputs, checking the file type against the 'accept' attribute.
 * 
 * @param fieldName - The name of the field being validated (e.g., "email", "phone").
 * @param dataType - The expected data type for the field (e.g., "text", "number").
 * @param value - The value of the field to validate.
 * @param required - Whether the field is required.
 * @param maxLength - The maximum allowed length for the field value.
 * @param minLength - The minimum allowed length for the field value.
 * @param minValue - The minimum allowed value for the field (for numeric fields).
 * @param maxValue - The maximum allowed value for the field (for numeric fields).
 * @param accept - The 'accept' attribute value for file inputs.
 * @param file - The file input (if any), used for file type validation.
 * 
 * @returns A string error message if validation fails, or `undefined` if the field is valid.
 */
export const validateField = (
    fieldName: string,
    dataType: string,
    value: string,
    required: boolean,
    maxLength: number | null,
    minLength: number | null,
    minValue: number | null,
    maxValue: number | null,
    accept: string | null,
    file: File | null
): string | undefined => {
    // 1. Validate required field (must not be empty)
    if (required && (value === null || value === '')) {
        return `${fieldName} is required`;
    }

    // 2. Validate using regex pattern for the data type
    const pattern = DATA_TYPES_RULES[dataType];
    if (pattern && value !== '' && !pattern.test(value)) {
        return `Invalid format for ${dataType} in ${fieldName}`;
    }

    // 3. Validate maxLength
    if (maxLength !== null && value.length > maxLength) {
        return `${fieldName} exceeds the maximum length of ${maxLength}`;
    }

    // 4. Validate minLength
    if (minLength !== null && value.length < minLength) {
        return `${fieldName} must be at least ${minLength} characters long`;
    }

    // 5. Validate minValue (only for numeric fields)
    if (minValue !== null && !isNaN(Number(value)) && Number(value) < minValue) {
        return `${fieldName} must be greater than or equal to ${minValue}`;
    }

    // 6. Validate maxValue (only for numeric fields)
    if (maxValue !== null && !isNaN(Number(value)) && Number(value) > maxValue) {
        return `${fieldName} must be less than or equal to ${maxValue}`;
    }

    // 7. File validation: Check if this is a file input
    if (dataType === 'file' && file) {
        // Validate the file type against the 'accept' attribute
        if (accept) {
            const acceptedTypes = accept.split(',').map(type => type.trim().toLowerCase());

            // Check if the file type matches the accepted types
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            if (fileExtension && !acceptedTypes.includes(fileExtension)) {
                return `${fieldName} must be a valid file type: ${acceptedTypes.join(', ')}`;
            }
        }
    }

    return undefined; // Validation passed
};


/**
 * Validates all form fields by iterating over the provided form data.
 * It checks each field's value, data type, and constraints, collecting errors where necessary.
 * 
 * @param formData - An object representing the form data, where each key is a field name 
 *                   and each value is an object containing the `value`, `dataType`, and constraints (e.g., `maxLength`, `minLength`).
 * 
 * @returns An object containing validation errors for fields that failed validation.
 *          If no errors exist, the object will be empty.
 */
export const validateFormData = (formData: { 
    [key: string]: {
        value: string;
        dataType: string;
        required: boolean;
        maxLength?: number | null; 
        minLength?: number | null; 
        minValue?: number | null;  
        maxValue?: number | null;  
        accept?: string | null;
        file?: File | null;
    } 
}): FormErrors => {
    const errors: FormErrors = {};

    // Iterate through the fields in the form data
    for (const fieldName in formData) {
        const { value, dataType, required, maxLength = null, minLength = null, minValue = null, maxValue = null, accept = null, file = null } = formData[fieldName];

        // Call the validateField function to validate each field
        const error = validateField(fieldName, dataType, value, required, maxLength, minLength, minValue, maxValue, accept, file);
        
        // If there's an error, add it to the errors object
        if (error) {
            errors[fieldName] = error;
        }
    }

    return errors;
};

