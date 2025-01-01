export interface ValidationError {
    [key: string]: string;
}

export function validatePassword(password: string): string | null {
    if (password.length < 8) {
        return 'Password must be at least 8 characters long';
    }
    return null;
}

export function validateRegistration(data: {
    password: string;
    passwordConfirm: string;
}): ValidationError {
    const errors: ValidationError = {};

    const passwordError = validatePassword(data.password);
    if (passwordError) {
        errors.password = passwordError;
    }

    if (data.password !== data.passwordConfirm) {
        errors.passwordConfirm = 'Passwords do not match';
    }

    return errors;
}