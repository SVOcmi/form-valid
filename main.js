let form = document.getElementById('form');

let username = document.getElementById('username');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmPassword = document.getElementById('confirm_password');
let phone = document.getElementById('phone');

let reset = document.getElementById('reset');

$(document).ready(function () {
    $('#phone').inputmask('+7(999)-999-99-99');
})

function isEmailValid(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

function isPasswordSecure(password) {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
};

function showError(input, message) {
    let formControl = input.parentElement;
    formControl.className = 'form-control error'
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    formControl = input.parentElement;
    formControl.className = 'form-control success'


    const error = formControl.querySelector('small');
    error.textContent = '';
}

function checkUsername() {
    let valid = false;
    let userEl = username.value.trim();
    if (userEl === '') {
        showError(username, 'Имя пользователя не введено');
    } else {
        showSuccess(username);
        valid = true;
    }

    return valid;
}

function checkEmail() {
    let valid = false;
    const emailEl = email.value.trim();
    if (emailEl === '') {
        showError(email, 'Email не введен');
    } else if (!isEmailValid(emailEl)) {
        showError(email, 'Введите корректный адрес электронной почты')
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
}

function checkPassword() {

    let valid = false;

    const passwordEl = password.value.trim();

    if (passwordEl === '') {
        showError(password, 'Пароль не введен');
    } else if (passwordEl.length < 6) {
        showError(password, 'Пароль должен быть короче 6 символов');
    } else if (!isPasswordSecure(passwordEl)) {
        showError(password, 'Пароль должен содержать символы (!@#$%^&*)');
    }
    else {
        showSuccess(password);
        valid = true;
    }

    return valid;
};

function checkConfirmPassword() {
    let valid = false;

    const confirmPasswordEl = confirmPassword.value.trim();
    const passwordEL = password.value.trim();

    if (confirmPasswordEl === '') {
        showError(confirmPassword, 'Подтвердите пароль');
    } else if (passwordEL !== confirmPasswordEl) {
        showError(confirmPassword, 'Пароль не совпадает');
    } else {
        showSuccess(confirmPassword);
        valid = true;
    }

    return valid;
};

function checkConfirmPhone() {
    let valid = false;

    const phoneEl = phone.value.trim();
    const phoneVal = phoneEl.replace(/[^0-9]/g, '');

    if (phoneEl === '') {
        showError(phone, 'Телефон введен неправильно');
    } else if (phoneVal.length !== 11) {
        showError(phone, 'Телефон введен не полностью');
    }
    else {
        showSuccess(phone);
        valid = true;
    }

    return valid;
};

function successPopup() {
    let popup = document.querySelector('.popup-success')
    popup.classList.remove('hidden')

    formControl.classList.remove('error');
    formControl.classList.remove('success');

    setTimeout(() => popup.classList.add('hidden'), 3000);
}

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let isUsernameValid = checkUsername(),
        isEmailValid = checkEmail(),
        isPasswordValid = checkPassword(),
        isConfirmPasswordValid = checkConfirmPassword();
    isConfirmPhoneValid = checkConfirmPhone();

    let isFormValid = isUsernameValid &&
        isEmailValid &&
        isPasswordValid &&
        isConfirmPasswordValid &&
        isConfirmPhoneValid;

    if (isFormValid) {
        let inputArr = form.querySelectorAll('input');
        let errorArr = form.querySelectorAll('.form-control');

        for (let formControl of errorArr) {
            formControl.classList.remove('error');
        formControl.classList.remove('success');
        }
        for (let input of inputArr)
            input.value = '';
        successPopup()
        //popup c  пождтверждением
    }

})

reset.addEventListener('click', function (e) {
    e.preventDefault();
    let inputArr = form.querySelectorAll('input');
    let errorArr = form.querySelectorAll('.form-control');

    for (let formControl of errorArr) {
        formControl.classList.remove('error');
        formControl.classList.remove('success');
    }
    for (let input of inputArr)
        input.value = '';

});

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'username':
            checkUsername();
            break;
        case 'email':
            checkEmail();
            break;
        case 'password':
            checkPassword();
            break;
        case 'confirm-password':
            checkConfirmPassword();
            break;
        case 'confirm-password':
            checkConfirmPhone();
            break;
    }
}));