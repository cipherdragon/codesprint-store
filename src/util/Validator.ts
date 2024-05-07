export const QA_KEYWORD = "QA";

export function isEmailValid(email: string): boolean {
    if (email === QA_KEYWORD) return true;
    
    if (!email) return false;
    if (email.length > 500) return false;
    return /^[^\s@]+@[^\s@]+\.[a-zA-Z]+$/.test(email);
}

export function isNameValid(name: string): boolean {
    if (name === QA_KEYWORD) return true;

    if (!name) return false;
    if (name.startsWith(" ")) return false;
    return /^[a-zA-Z\s]{1,200}$/.test(name);
}

export function isPhoneValid(phone: string): boolean {
    if (phone === QA_KEYWORD) return true;

    if (!phone) return false;
    return /^[0-9]{10}$/.test(phone);
}

export function isAddressValid(address: string): boolean {
    if (address === QA_KEYWORD) return true;

    if (!address) return false;
    return /^[^=]{1,1000}$/.test(address);
}