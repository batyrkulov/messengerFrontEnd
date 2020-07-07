export const maxLenCreator = maxLen => value => {
    if (value.length>maxLen) return 'The maximum length is '+maxLen+' symbols';
    return undefined;
}

export const required = value=> {
    if (value) return undefined;
    return 'The field is required';
}

export  const validEmail = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined

export const password = value=> {
    if (/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(value))
        return undefined;
    else return `
           Passwords must be 
        * - At least 8 characters long, max length anything
        * - Include at least 1 lowercase letter
        * - 1 capital letter
        * - 1 number
        * - 1 special character => !@#$%^&*
    `;
}

export const passwordConfirm = (value, allValues) => {
    return value === allValues.password ? undefined : 'Passwords are not equal'
}
