import { toAscii } from 'idna-uts46';

function isAsciiEmail(email) {
    return /^[\x00-\x7F]+@[\x00-\x7F]+\.[\x00-\x7F]+$/.test(email);
}


export function validateEmail(email: string): boolean {
    if (isAsciiEmail(email)) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    } else {
        try {
            const [localPart, domainPart] = email.split('@');
            const asciiDomain = toAscii(domainPart);
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(`${localPart}@${asciiDomain}`);
        } catch (e) {
            return false;
        }
    }
}