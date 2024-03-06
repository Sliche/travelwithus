$(document).ready(function(){
    var svePonude;

    $.ajax({
      url: 'assets/data/offers.json',
      dataType: 'json',
      success: function(data){
        svePonude = data.offers;
        popuniPadajucuListu(svePonude);
      }
    });

    function popuniPadajucuListu(ponude) {
        var select = $('#drpbox');
        select.append($('<option></option>').val('All').text('All')); 
    
        var jedinstveneLokacije = [];
        for (var i = 0; i < ponude.length; i++) {
            var ponuda = ponude[i];
            if (!jedinstveneLokacije.includes(ponuda.location)) {
                jedinstveneLokacije.push(ponuda.location);
            }
        }
    
        for (var j = 0; j < jedinstveneLokacije.length; j++) {
            select.append($('<option></option>').val(jedinstveneLokacije[j]).text(jedinstveneLokacije[j]));
        }
    
        select.change(function() {
            try {
                var izabranaLokacija = $(this).val(); 
                var filtriranePonude;
                if(izabranaLokacija === 'All') {
                    filtriranePonude = svePonude; 
                } else {
                    filtriranePonude = svePonude.filter(function(ponuda) {
                        return ponuda.location === izabranaLokacija; 
                    });
                }
            } catch (error) {
                console.error('There is error loading the locations', error);
            }
        });
    }

    var form = document.getElementById('contact-form');
    var username = document.getElementById('username');
    var email = document.getElementById('email');
    var password = document.getElementById('password');
    var password2 = document.getElementById('password2');
    var textarea = document.getElementById('textarea');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var u = 0, e = 0, p = 0, p2 = 0;
        checkInputs();
    
        
        if (u === 1 && e === 1 && p === 1 && p2 === 1) {
            localStorage.setItem('username', username.value.trim());
            localStorage.setItem('email', email.value.trim());
            localStorage.setItem('textarea', textarea.value.trim());
            console.log('Podaci uspešno smešteni u localStorage.');
        }
    });
    
    
    document.addEventListener('DOMContentLoaded', function() {
        var savedUsername = localStorage.getItem('username');
        var savedEmail = localStorage.getItem('email');
        var savedTextarea = localStorage.getItem('textarea');
    
        if (savedUsername && savedEmail && savedTextarea) {
            if (username) {
                username.value = savedUsername;
            } else {
                console.error("Element with ID 'username' not found.");
            }

            if (email) {
                email.value = savedEmail;
            } else {
                console.error("Element with ID 'email' not found.");
            }

            if (textarea) {
                textarea.value = savedTextarea;
            } else {
                console.error("Element with ID 'textarea' not found.");
            }

            console.log('Podaci uspešno učitani iz localStorage-a.');
        }
    });

   
    function checkInputs() {
        var usernameValue = username.value.trim();
        var emailValue = email.value.trim();
        var passwordValue = password.value.trim();
        var password2Value = password2.value.trim();
        var textareaValue = textarea.value.trim();
        var u, e, p, p2; 

        
        if (usernameValue === '') {
            setErrorFor(username, 'Username cannot be empty');
        } else if (!/^[A-Z][a-zA-Z0-9]*$/.test(usernameValue)) {
            setErrorFor(username, 'Username must start with a capital letter');
        } else {
            setSuccessFor(username);
            u = 1;
        }

        
        if (textareaValue === '') {
            setErrorFor(textarea, 'You cannot leave this empty ');
        } else {
            setSuccessFor(textarea);
            t = 1;
        }

        
        if (emailValue === '') {
            setErrorFor(email, 'Email cannot be empty');
        } else if (!isEmail(emailValue)) {
            setErrorFor(email, 'This is not a valid email');
        } else {
            setSuccessFor(email);
            e = 1;
        }

        
        if (passwordValue === '') {
            setErrorFor(password, 'Password cannot be empty');
        } else if (!/^(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$/.test(passwordValue)) {
            setErrorFor(password, 'Password must have at least one uppercase letter and one number');
        } else {
            setSuccessFor(password);
            p = 1;
        }

        
        if (password2Value === '') {
            setErrorFor(password2, 'Password2 cannot be empty');
        } else if (passwordValue !== password2Value) {
            setErrorFor(password2, 'Passwords do not match');
        } else {
            setSuccessFor(password2);
            p2 = 1;
        }

        
        if (u === 1 && e === 1 && p === 1 && p2 === 1) {
            console.log('username: ' + usernameValue);
            console.log('email: ' + emailValue);
            console.log('password: ' + passwordValue);
            console.log('confirmed password: ' + password2Value);
            
            localStorage.setItem('username', usernameValue);
            localStorage.setItem('email', emailValue);
            localStorage.setItem('password', passwordValue);
            localStorage.setItem('textarea', textareaValue);
        }
        function isEmail(email) {
            
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            
            var supportedDomains = /(gmail\.com|yahoo\.com|hotmail\.com)$/;
        
            return regex.test(email) && supportedDomains.test(email.split('@')[1]);
        }

    
    }

    function setErrorFor(input, message) {
        var formControl = input.parentElement;
        var small = formControl.querySelector('small');
        if (small) {
            small.innerText = message;
            formControl.className = 'form-group1 error';
        } else {
            console.error("Small element not found for input:", input);
        }
    }

    function setSuccessFor(input) {
        var formControl = input.parentElement;
        if (formControl) {
            formControl.className = 'form-group1 success';
        } else {
            console.error("Parent element not found for input:", input);
        }
    }
});
