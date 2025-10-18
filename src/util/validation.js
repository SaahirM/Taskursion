// Regular expression from https://emailregex.com/
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASS_REGEX = /(?=.*[^A-Za-z0-9_ \t\r\n\v\f])(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/;

const MAX_NAME_LEN = 255;
const MAX_EMAIL_LEN = 254;
const MIN_PASS_LEN = 8;
const MAX_TASK_TITLE_LEN = 100;
const MAX_TASK_DESC_LEN = 3000;

export function validateName(name) {
    if (name.length > MAX_NAME_LEN) {
        return "This name is too long! Please use at most 255 characters.";
    }
    
    return "";
}

export function validateEmail(email) {
    if (email.length > MAX_EMAIL_LEN) {
        return "This email is too long! Email addresses must not exceed 254 characters.";
    } else if (!EMAIL_REGEX.test(email)) {
        return "This email isn't formatted right";
    }
    
    return "";
}

export function validatePass(pass) {
    if (pass.length < MIN_PASS_LEN) {
        return "This password is too short! It needs to have at least 8 characters.";
    } else if (!PASS_REGEX.test(pass)) {
        return "This password doesn't meet the requirements.";
    }

    return "";
}

export function validateTaskTitle(title) {
    if (title.length > MAX_TASK_TITLE_LEN) {
        return "Task titles cannot have more than 100 characters";
    }
    
    return "";
}

export function validateTaskDesc(desc) {
    if (desc.length > MAX_TASK_DESC_LEN) {
        return "Task descriptions cannot have more than 3000 characters";
    }
    
    return "";
}