const EARTH_RADIUS = 3_958.8; // Units: Miles


export interface CalculateDistanceParams {
    from_latitude:  number;
    from_longitude: number;

    to_latitude:    number;
    to_longitude:   number;
}


export function toRadians(angle: number): number {
    return (angle * Math.PI) / 180;
}


export function calculate_distance({
    from_latitude,
    from_longitude,
    to_latitude,
    to_longitude,
}: CalculateDistanceParams): number {
    const delta_latitude  = toRadians(to_latitude - from_latitude);
    const delta_longitude = toRadians(to_longitude - from_longitude);

    const sin_half_delta_latitude  = Math.sin(delta_latitude  / 2);
    const sin_half_delta_longitude = Math.sin(delta_longitude / 2);

    const haversine =
        sin_half_delta_latitude * sin_half_delta_latitude   +
        sin_half_delta_longitude * sin_half_delta_longitude *
        Math.cos(toRadians(from_latitude))                  *
        Math.cos(toRadians(to_latitude));

    const central_angle = 2 * Math.atan2(
        Math.sqrt(  haversine  ),
        Math.sqrt(1 - haversine)
    );
    
    return EARTH_RADIUS * central_angle;
}
