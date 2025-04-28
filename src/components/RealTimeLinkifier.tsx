import React, { useRef, useEffect } from 'react';
// We use the punycode library for domain name conversion.
import punycode from 'punycode';  // Ensure to install '@types/punycode' for TypeScript types if needed.

const LinkifyEditor: React.FC = () => {
    const editorRef = useRef<HTMLDivElement>(null);
    const debounceTimer = useRef<number | null>(null);

    // Regular expression to match emails and domains (internationalized).
    // - Emails: <local>@<domain>.<TLD>
    // - Domains: <name>.<TLD> (with possible subdomains)
    const linkRegex = useRef<RegExp>(
        /([0-9A-Za-z\p{L}._%+-]+@[0-9A-Za-z\p{L}.-]+\.[A-Za-z\p{L}]{2,})|((?:[0-9A-Za-z\p{L}-]+\.)+[A-Za-z\p{L}]{2,})/gu
    );

    // Function to convert a Unicode domain to punycode (ASCII).
    const toPunycode = (domain: string): string => {
        try {
            // Use the punycode library to convert to ASCII.
            return punycode.toASCII(domain);
        } catch {
            return domain; // If conversion fails, return original (perhaps already ASCII).
        }
    };

    const linkifyContent = () => {
        const editor = editorRef.current;
        if (!editor) return;

        // Get the plain text content (so we ignore existing tags when re-linkifying).
        const textContent = editor.innerText || "";
        // Replace using the regex, wrapping detected patterns in anchor tags.
        const linkedHTML = textContent.replace(linkRegex.current, (match: string) => {
            if (match.includes("@")) {
                // It's an email address.
                const [localPart, domainPart] = match.split("@");
                const asciiDomain = toPunycode(domainPart);
                // Construct mailto: URL. We leave localPart as-is (UTF-8 allowed), punycode the domain.
                const mailtoHref = `mailto:${localPart}@${asciiDomain}`;
                return `<a href="${mailtoHref}" class="linkified">${match}</a>`;
            } else {
                // It's a domain name (no @ present).
                const asciiDomain = toPunycode(match);
                const urlHref = `http://${asciiDomain}`;
                return `<a href="${urlHref}" class="linkified">${match}</a>`;
            }
        });

        // Update the contenteditable HTML with linkified content.
        editor.innerHTML = linkedHTML;
    };

    // Handler for input events with debounce.
    const handleInput = () => {
        if (debounceTimer.current) {
            window.clearTimeout(debounceTimer.current);
        }
        // Set a new timer to linkify after 300ms of inactivity.
        debounceTimer.current = window.setTimeout(() => {
            linkifyContent();
            debounceTimer.current = null;
        }, 300);
    };

    // Clean up the timer on unmount (to avoid any lingering timeout).
    useEffect(() => {
        return () => {
            if (debounceTimer.current) {
                window.clearTimeout(debounceTimer.current);
            }
        };
    }, []);

    return (
        <div
            ref={editorRef}
            contentEditable={true}
            onInput={handleInput}
            className="editor"  // You can define styles for .editor and .linkified in CSS
            suppressContentEditableWarning={true}  // Suppress warning since we're not using React state for innerHTML.
        >
            {/* The div can start empty or with initial content if needed. */}
            Type or paste text here, including emails like user@例え.com or domains like 弾幕.jp, and watch them linkify!
        </div>
    );
};

export default LinkifyEditor;
