export function isEmailValid(email: string): boolean {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/.test(email);
}

export function isNameValid(name: string): boolean {
    if (!name) return false;
    if (name.startsWith(" ")) return false;
    return /^[a-zA-Z\s]+$/.test(name);
}

export function isPhoneValid(phone: string): boolean {
    if (!phone) return false;
    if (phone.length !== 10) return false;
    return /^[0-9]+$/.test(phone);
}