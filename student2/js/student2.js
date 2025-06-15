const { response } = require("express");

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
            setError(nameF, 'Name is required');
        }else{
            setSuccess(nameF);
        }

        if(emailValue === ''){
            setError(email, "Email is required");
        } else if (!isValidEmail(emailValue)){
            setError(email, "Enter a valid email address");
        } else{
            setSuccess(email);
        }

        if(subjectValue === ''){
            setError(subject, 'Subject is required');
        }else{
            setSuccess(subject);
        }

        if(messageValue === ''){
            setError(message, 'Message is required');
        }else{
            setSuccess(message);
        }

    };


    document.addEventListener('DOMContentLoaded', function(){
    const url = 'http://127.0.0.1:8000';

    async function loadContact_Info() {
        try{
            const response = await fetch(`${url}/contact_info`);

            if(!response.ok){
                console.error('Failed fetching:', response.status);
                return;
            }
        

        const info = await response.json();
        const infoCon = document.getElementById('contact_info');

        info.forEach(contact => {
            const infoCon = `
            <div class="container text-center" id="contact_info">
          <div class="row">
            <div class="col-md-3">
              <div class="icon-circle"><i class="bi bi-geo-alt"></i></div>
              <p><strong>Address:</strong><br><a class="links-contact" href="https://maps.app.goo.gl/Vy2guo1R9i3bRyHo9">${contact.location}</a></p>
            </div>
            <div class="col-md-3">
              <div class="icon-circle"><i class="bi bi-telephone"></i></div>
              <p><strong>Phone:</strong><br /><a class="links-contact" href="tel:${contact.phone}">+3212 34 56 78</a></p>
            </div>
            <div class="col-md-3">
              <div class="icon-circle"><i class="bi bi-envelope"></i></div>
              <p><strong>Email:</strong><br /><a class="links-contact" href="mailto:${contact.email}">info@dykotrix.be</a></p>
            </div>
            <div class="col-md-3">
              <div class="icon-circle"><i class="bi bi-globe"></i></div>
              <p><strong>VAT Number:</strong><br />BTW BE 1234 567 891</p>
            </div>
          </div>
        </div>
            `;
            infoCon.insertAdjacentHTML('beforeend', infoCon);
        });
    } catch (error){
        console.error('Network error: ', error);
        } 

        loadContact_Info();
    });