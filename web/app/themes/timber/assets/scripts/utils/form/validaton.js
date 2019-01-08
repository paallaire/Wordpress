//import hyperform from 'hyperform';
import {
    HYPERFORM_STRING_FR
} from './hyperform/fr';

export default function (lang) {

    const form = document.querySelector('#form-validation');

    if (form !== null) {
        hyperform(form, {
            classes: {
                valid: 'is-valid',
                invalid: 'is-invalid',
                validated: 'is-valid',
                warning: 'form-input-status',
            }
        });

        if (lang == 'fr') {
            hyperform.addTranslation("fr", HYPERFORM_STRING_FR);
            hyperform.setLanguage("fr");
        }

        form.addEventListener('submit', event => {

            event.preventDefault();

            const target = event.target;

            if (target.checkValidity()) {
                console.log('submit');
                //target.submit();
            }

        });
    }

}
