export async function copyToClipboard(value: string) {
    if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        return;
    }
    const previousFocus = document.activeElement as HTMLElement | null;
    const field = document.createElement("textarea");
    field.value = value;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    try {
        field.select();
        if (!document.execCommand("copy")) throw new Error("주소를 복사하지 못했습니다.");
    } finally {
        field.remove();
        previousFocus?.focus();
    }
}
