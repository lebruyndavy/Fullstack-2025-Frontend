    //set constants
    const nameF = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    const submit = document.getElementById('submit');
    const form = document.getElementById('form');

    //prevents from for submitting and validates input first
    form.addEventListener('submit', e =>{
        e.preventDefault();

        validateInputs();
    });

    //Sets error message
    const setError = (element, errorMessage) => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');

        errorDisplay.innerText = errorMessage;
        inputControl.classList.add('error');
        inputControl.classList.remove('success');
    };

    //succes
    const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');


        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
    };

    //validates if email had correct form
    const isValidEmail = email => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return re.test(String(email).toLowerCase());
    }

    const validateInputs = () => {
        const nameFValue = nameF.value.trim();
        const emailValue = email.value.trim();
        const subjectValue = subject.value.trim();
        const messageValue = message.value.trim();

        if(nameFValue === ''){
            setError(nameF, 'Naam is verplicht');
        }else{
            setSuccess(nameF);
        }

        if(emailValue === ''){
            setError(email, "Email is veplicht");
        } else if (!isValidEmail(emailValue)){
            setError(email, "Vul een geldig email adres in");
        } else{
            setSuccess(email);
        }

        if(subjectValue === ''){
            setError(subject, 'Onderwerp is verplicht');
        }else{
            setSuccess(subject);
        }

        if(messageValue === ''){
            setError(message, 'Bericht is verplicht');
        }else{
            setSuccess(message);
        }

    };
