export interface FormFieldData {
    value: string;
    dataType: string | null; // Represents the 'data-type' attribute (e.g., 'text', 'number', etc.)
    conceptType: string | null; // Represents the 'concept-type' attribute (e.g., 'name', 'phone', etc.)
    maxLength: number | null; // Represents the 'data-maxlength' attribute
    minLength: number | null; // Represents the 'data-minlength' attribute
    minValue: number | null; // Represents the 'data-min' attribute (for number inputs)
    maxValue: number | null; // Represents the 'data-max' attribute (for number inputs)
    accept: string | null; // Represents the 'accept' attribute (for file inputs)
    required: boolean;
}

/**
 * Utility function to get input field data and attributes
 * @param fieldId - The ID of the form field (input element).
 * @returns - An object containing the field's value and constraints (type, maxLength, etc.).
 */
export const getFormFieldData = (fieldId: string): FormFieldData => {
    const inputElement = document.getElementById(fieldId) as HTMLInputElement | null;

    // Check if the element exists
    if (!inputElement) {
        console.warn(`Element with id "${fieldId}" not found.`);
        return {
            value: '',
            dataType: null,
            conceptType: null,
            maxLength: null,
            minLength: null,
            minValue: null,
            maxValue: null,
            accept: null,
            required: false,
        };
    }
    
    // Check for the `required` attribute
    const required = inputElement.hasAttribute('required') || inputElement.getAttribute('data-required') === 'true';

    // Proceed to gather data if the element exists
    const data: FormFieldData = {
        value: inputElement.value,
        dataType: inputElement.getAttribute('data-type'),
        conceptType: inputElement.getAttribute('concept-type'),
        maxLength: inputElement.getAttribute('data-maxlength') ? parseInt(inputElement.getAttribute('data-maxlength')!) : null,
        minLength: inputElement.getAttribute('data-minlength') ? parseInt(inputElement.getAttribute('data-minlength')!) : null,
        minValue: inputElement.getAttribute('data-min') ? parseInt(inputElement.getAttribute('data-min')!) : null,
        maxValue: inputElement.getAttribute('data-max') ? parseInt(inputElement.getAttribute('data-max')!) : null,
        accept: inputElement.getAttribute('accept') || null,
        required: required,
    };
    return data;
};

