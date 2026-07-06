export function ToRevenue(value: number): string {
    if (!value && value !== 0) {
        return 'N/A'
    }

    if (value < 1_000) {
        return value.toString()
    }

    if (value < 1_000_000) {
        return `${Math.floor(value / 1000)}K+`
    }

    if (value < 1_000_000_000) {
        return `${Math.floor(value / 1_000_000)}M+`
    }
    
    return `${Math.floor(value / 1_000_000_000)}B+`
}