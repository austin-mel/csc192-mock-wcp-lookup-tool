import { onMounted, ref } from "vue";
import { GeolocationService } from "@/services";


export function useGeolocation(options?: PositionOptions) {
    const is_supported = false;
    const latitude = ref<number>();
    const longitude = ref<number>();
    const error = ref<Error>();
    const is_loading = ref(false);
    const {
        data:       ip_approximation,
        error:      ip_error,
        refetch:    approximate_geolocation,
    } = GeolocationService.Get({ fetchOnMount: false });


    async function fallback_to_ip() {
        is_loading.value = true;

        try {
            await approximate_geolocation();
            if ( ip_error.value ) {
                throw ip_error.value
            }

            latitude.value = ip_approximation.value?.latitude;
            longitude.value = ip_approximation.value?.longitude;
        }
        catch (err) {
            error.value = new Error("Failed to load demo geolocation...");
        }
        finally {
            is_loading.value = false;
        }
    }


    function get_current_position() {
        void options;
        return void fallback_to_ip();
    }

    onMounted(() => {
        get_current_position();
    });


    return {
        is_supported,
        is_loading,
        latitude,
        longitude,
        error,
        get_current_position,
    }
}
