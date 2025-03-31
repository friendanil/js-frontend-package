import { StatefulWidget } from "../../default/StatefulWidget";
import { Anomaly } from "../../services/anomaly.service";
import { validateField, validateFormData} from "../../services/validation.service";
import { getFormFieldData } from "../../utils/formUtils";

/**
 * Example form for creating and submitting contact data and check anomaly.
 * This class extends the `StatefulWidget` to handle the dynamic rendering of the contact form and form validation.
 */
export class createContacts extends StatefulWidget{

    /**
     * Adds event listeners to the form elements and handles form submission.
     * Validates the form data and checks for anomalies in the input data.
     * 
     * @returns {void} This method does not return anything.
     */
    addEvents(): void {
        // Get the contact form element
        const contactForm = document.getElementById("contactForm") as HTMLFormElement;
        console.log("Call of Contact Form");
        
        // @LogExecution("write")
        contactForm.addEventListener("submit", async(event) => {
            event.preventDefault();
          
            // Function to collect form data
            const createFormData = () => {
              const formData: Record<string, any> = {}; 
              
              const formFields = [
                'name', 'phone', 'document', 'sound', 'image', 'video',
                'url', 'date', 'time', 'password', 'ipaddress', 'uuid'
              ];
              
              formFields.forEach(fieldId => {
                formData[fieldId] = getFormFieldData(fieldId);
              });

              return formData;
            };

            /**
             * Create a formData object from each form elements
             */
            const formData = createFormData()
            console.log("Instances Data : ", formData);


            /**
             * Form Validation Part
             */
            const errors = validateFormData(formData);
            console.log("Contact Forms:", formData);
            console.log("Form Errors:", errors);
            

            /**
             * Anomaly Detection
             */
            try {
              // Example for a single field anomaly check
              const name = formData.name.value;
              const anomaly_instance = new Anomaly();
              const res = await anomaly_instance.checkConceptAnomaly('name', name);
              console.log("Result of single anomaly test: ", res);
      
              // Perform anomaly detection for the entire form
              const anomalies = await Anomaly.checkAnomalyInBulk(formData);
              console.log("Anomaly Check Result: ", anomalies);
      
            } catch (error) {
                console.error("Anomaly check failed:", error);
            }  

        });
    }

    getHtml(): string { 
      let html = `
      <div class="container">
        <form id="contactForm">
          <div>
            <input type="number" id="id" hidden>
  
            <div class="formbody">
              <label for="name">Name (Text-Only)</label>
              <input type="text" id="name" placeholder="Name" data-type="textOnly" concept-type="name" data-maxlength="50" data-required="true">
            </div>
  
            <div class="formbody">
              <label for="phone">Phone (Number)</label>
              <input type="text" id="phone" placeholder="Phone" data-type="number" concept-type="phone" data-maxlength="15" data-min="1000000000" data-max="9999999999">
            </div>
  
            <div class="formbody">
              <label for="document">Document</label>
              <input type="file" id="document" accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx" data-type="document" concept-type="resume">
            </div>
  
            <div class="formbody">
              <label for="sound">Sound</label>
              <input type="file" id="sound" accept=".mp3,.wav,.ogg,.flac" data-type="sound" concept-type="audio">
            </div>
  
            <div class="formbody">
              <label for="image">Image</label>
              <input type="file" id="image" accept=".jpg,.jpeg,.png,.gif,.bmp,.svg,.webp" data-type="image" concept-type="profile_image">
            </div>
  
            <div class="formbody">
              <label for="video">Video</label>
              <input type="file" id="video" accept=".mp4,.avi,.mov,.mkv,.flv,.webm" data-type="video" concept-type="video">
            </div>
  
            <div class="formbody">
              <label for="url">URL</label>
              <input type="text" id="url" placeholder="https://example.com" data-type="url" concept-type="website">
            </div>
  
            <div class="formbody">
              <label for="date">Date (YYYY-MM-DD)</label>
              <input type="date" id="date" placeholder="YYYY-MM-DD" data-type="date"concept-type="date_of_birth">
            </div>
  
            <div class="formbody">
              <label for="time">Time (HH:MM)</label>
              <input type="time" id="time" placeholder="HH:MM" data-type="time" concept-type="birth_time">
            </div>
  
            <div class="formbody">
              <label for="password">Password</label>
              <input type="password" id="password" placeholder="Password" data-type="password" concept-type="password">
            </div>
  
            <div class="formbody">
              <label for="ipaddress">IP Address</label>
              <input type="text" id="ipaddress" placeholder="192.168.0.1 or ::1" data-type="ipaddress" concept-type="ip_address">
            </div>
  
            <div class="formbody">
              <label for="uuid">UUID</label>
              <input type="text" id="uuid" placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" data-type="uuid" concept-type="unique_id">
            </div>
  
            <button class="btn btn-primary" id="submit" type="submit">Submit</button>
          </div>
        </form>
      </div>`;
  
      return html;
    }
  

}