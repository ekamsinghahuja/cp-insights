export function getBoolean(value: string | null): boolean {
    return value?.toLowerCase() === "true";
}
