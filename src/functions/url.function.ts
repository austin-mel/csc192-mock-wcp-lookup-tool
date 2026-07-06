export function URLWithParams(
    base: string,
    params: Record<string, string | number | boolean>,
): string {
    const query_params = Object.entries(params).
        map(
            ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
        ).
        join("&");

    const separator = base.includes('?') ? '&' : '?'
    
    return `${base}${separator}${query_params.toString()}`;
}
