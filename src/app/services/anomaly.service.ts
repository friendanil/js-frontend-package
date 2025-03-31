import { DATA_TYPES_RULES } from "../utils/constants";
import { environment } from "../environments/environment.dev";
import { FormFieldData } from '../utils/formUtils'

/**
 * Class representing the Anomaly detection logic for checking data validity based on predefined rules.
 * This class contains methods for initializing, caching, and fetching anomaly parameters from an external API,
 * as well as checking for anomalies in individual concepts and bulk data.
 */
export class Anomaly {
    /**
     * Static cache for storing fetched anomaly parameters.
     * @type {any} - Stores the fetched anomaly parameters from the API.
     */
    private static anomalyParamsCache: any = null;

    /**
     * Flag indicating if the anomaly parameters cache has been initialized.
     * @type {boolean} - `true` if the cache is initialized, `false` otherwise.
     */
    private static cacheInitialized: boolean = false;

    /**
     * Timestamp indicating the last time the anomaly parameters were fetched.
     * @type {number} - Time in milliseconds (Unix timestamp).
     */
    private static lastFetchedTime: number = 0;

    /**
     * Cache expiry threshold, after which the data will be considered expired.
     * @type {number} - Cache expiry threshold in milliseconds (default is 10 minutes).
     */
    private static cacheExpiryThreshold: number = 10 * 60 * 1000;

    /**
     * Constructor that initializes anomaly parameters if the cache is not yet initialized.
     * It ensures that the anomaly parameters are loaded and cached for use.
     */
    constructor() {
        if (!Anomaly.cacheInitialized) {
            Anomaly.initializeAnomalyParameters();
        }
    }

    /**
     * Initializes the anomaly parameters by fetching them from the API.
     * This method is only run once on startup to ensure the cache is ready for use.
     * It will fetch the parameters from the API and store them in a static cache.
     * 
     * @returns {Promise<void>} - A promise that resolves once the parameters have been initialized.
     */
    private static async initializeAnomalyParameters(): Promise<void> {
        try {
            // Fetch anomaly parameters once on startup
            const anomalyData = await Anomaly.getAnomalyParameters();
            // console.log('Anomaly parameters initialized:', anomalyData);
            
            // Refresh the cache to ensure it's up-to-date
            Anomaly.refreshCache();
            Anomaly.cacheInitialized = true;
        } catch (error) {
            console.error('Error during anomaly parameter initialization:', error);
        }
    }

    /**
     * Fetches the anomaly parameters.
     * It first checks if the parameters are cached and whether the cache is still valid (not expired).
     * If the cache is valid, it returns the cached data. If not, it fetches the data from the API.
     * 
     * @returns {Promise<any>} - A promise that resolves to the anomaly parameters.
     */
    public static async getAnomalyParameters(): Promise<any> {
        const currentTime = Date.now();
        if (Anomaly.anomalyParamsCache && (currentTime - Anomaly.lastFetchedTime < Anomaly.cacheExpiryThreshold)) {
            console.log('Returning cached anomaly parameters');
            return Anomaly.anomalyParamsCache;
        }

        try {
            // If data is not cached or expired, fetch it from the API
            const data = await Anomaly.fetchAnomalyParameters();
            return data;
        } catch (error) {
            console.error('Error fetching anomaly parameters:', error);
            throw error;
        }
    }

    /**
     * Fetches anomaly parameters directly from the backend API.
     * This method is used internally by `getAnomalyParameters` to retrieve fresh data.
     * 
     * @returns {Promise<any>} - A promise that resolves to the fetched anomaly parameters.
     */
    private static async fetchAnomalyParameters(): Promise<any> {
        // Fetching anomaly parameters from the API...'
        const url = `${environment.aiURL}/v1/get-frontend-anomaly-parameters`;

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch anomaly parameters");
            }

            const data = await response.json();
            // Cache the fetched data and update the timestamp
            Anomaly.anomalyParamsCache = data.data;
            Anomaly.lastFetchedTime = Date.now();
            return data.data;
        } catch (error) {
            console.error("API Fetch Error:", error);
            throw error;
        }
    }

    /**
     * Refreshes the anomaly parameters cache if the cache has expired.
     * If the cache expiry threshold has been surpassed, the method re-fetches the data from the API.
     * 
     * @returns {Promise<void>} - A promise that resolves when the cache has been refreshed.
     */
    private static async refreshCache(): Promise<void> {
        try {
            const currentTime = Date.now();
            if (currentTime - Anomaly.lastFetchedTime > Anomaly.cacheExpiryThreshold) {
                // Cache expired, re-fetch the data
                await Anomaly.getAnomalyParameters();
            }
        } catch (error) {
            console.error("Error refreshing anomaly parameters cache:", error);
        }
    }

    /**
     * Detects the data type of a given value based on predefined rules.
     * It checks the value against the `DATA_TYPES_RULES` to find the matching data type.
     * 
     * @param {string} value - The value to check.
     * @returns {string | null} - The detected data type, or `null` if no match is found.
     */
    detectDataType(value: string): string | null {
        for (const [dataType, regex] of Object.entries(DATA_TYPES_RULES)) {
            if (regex.test(value)) {
                return dataType;
            }
        }
        return null;
    }

    /**
     * Checks whether a given concept and value pair contains an anomaly.
     * An anomaly is detected based on the concept's length and type rules.
     * 
     * @param {string} typeConcept - The concept type (e.g., `the_name`).
     * @param {string} value - The value to check for anomalies.
     * @returns {Promise<{ valid: boolean, warnings: string[] }>} - A promise that resolves to an object containing:
     * - `valid`: A boolean indicating whether the value is valid according to the anomaly rules.
     * - `warnings`: An array of warning messages related to the value's anomalies.
     */
    async checkConceptAnomaly(typeConcept: string, value: string): Promise<{ valid: boolean, warnings: string[] }> {
        const warnings: string[] = [];
        try {
            const typeDetails = Anomaly.anomalyParamsCache;
            const fullTypeConcept = `the_${typeConcept}`;
            const conceptDetails = typeDetails[fullTypeConcept];

            if (!conceptDetails) {
                console.warn(`No concept details found for type: ${fullTypeConcept}`);
                warnings.push(`No concept details found for type: ${fullTypeConcept}`);
                return { valid: false, warnings };
            }

            const length = value.length;
            const { min_length, max_length, data_types } = conceptDetails;

            const lengthValid = length >= min_length && length <= max_length;
            const detectedType = this.detectDataType(value);
            const typeValid = data_types.includes(detectedType);

            if (!lengthValid) {
                warnings.push(`Length of '${value}' is outside the allowed range (min: ${min_length}, max: ${max_length}). Current length: ${length}.`);
            }

            if (!typeValid) {
                warnings.push(`Type mismatch for '${value}'. Expected types: ${data_types.join(', ')}, detected type: ${detectedType}.`);
            }

            if (lengthValid && typeValid) {
                warnings.push(`Concept ${typeConcept} is valid. Length: ${length}, Type: ${detectedType}`);
            }

            return { valid: lengthValid && typeValid, warnings };
        } catch (error) {
            console.error(`Error checking anomaly for ${typeConcept} with value ${value}:`, error);
            return { valid: false, warnings };
        }
    }

    /**
     * Checks anomalies for multiple concepts in bulk.
     * Iterates over a record of concept-value pairs and detects anomalies.
     * 
     * @param {Record<string, string>} instanceData - An object where each key is a concept type and each value is the corresponding data value.
     * @returns {Promise<Record<string, { valid: boolean, warnings: string[] }>>} - A promise that resolves to an object where each key is a concept type
     * and the value is an object containing `valid` (boolean) and `warnings` (array of warning messages).
     */
    static async checkAnomalyInBulk(formData: Record<string, FormFieldData>): Promise<Record<string, { valid: boolean, warnings: string[] }>> {
        if (!Anomaly.cacheInitialized) {
            await Anomaly.initializeAnomalyParameters();
        }

        try {
            const anomalyResults: Record<string, { valid: boolean, warnings: string[] }> = {};

            for (const [typeConcept, instanceData] of Object.entries(formData)) {

                const instanceValue = instanceData.value
                const { valid, warnings } = await new Anomaly().checkConceptAnomaly(typeConcept, instanceValue);
                anomalyResults[typeConcept] = { valid, warnings };
            }

            return anomalyResults;
        } catch (error) {
            console.error("Bulk Anomaly Check Error:", error);
            throw error;
        }
    }
}
