const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function vallidate(name, surName, age, email, pass, nat) {
    if (!name) {
        alert('Ismingizni kiritmadingiz');
        return false;
    }

    if (name.length < 3) {
        alert('Ismingizni Togri kiriting')
        return false;
    }

    if (Number(name)) {
        alert('Ismingiz Raqamda bolmaydi !');
        setName('');
        return false;
    }


    if (!surName) {
        alert('Familyangizni kiritmadingiz');
        return false;
    }

    if (surName.length < 5) {
        alert('Familyangizni Togri kiriting')
        return false;
    }

    if (Number(surName)) {
        alert('Familyangiz Raqamda bolmaydi !');
        return false;
    }



    if (!age) {
        alert('Yoshingizni kiritmadingiz');
        return false;
    }

    if (!Number(age)) {
        alert('Yoshingizni raqamlarda kiritng')
        setAge('');
        return false;
    }

    if (!email) {
        alert('Emailingizni kiritmadingiz');
        return false;
    }

    const emailV = validateEmail(email);

    if (!emailV) {
        alert('Emailingiz formati Notogri');
        return false;
    }


    if (!pass) {
        alert('Parolni kiritmadingiz');
        return false;
    }

    if (!nat) {
        alert('Tilingizni tanlamadngiz')
        return false;
    }


    return true;
}




export { vallidate }