import { ref } from "vue";

import { UseFetchOptions } from "@/hooks";
import { GeolocationDTO } from "@/types";
import { DemoDataService } from "./demo-data.service";

export namespace GeolocationService {
    export function Get(options?: UseFetchOptions) {
        const data = ref<GeolocationDTO.Get | null>(
            options?.fetchOnMount ? DemoDataService.getGeolocation() : null,
        );
        const error = ref<string | null>(null);
        const is_loading = ref(false);

        const refetch = async () => {
            is_loading.value = true;
            data.value = DemoDataService.getGeolocation();
            is_loading.value = false;
        };

        return { data, error, is_loading, refetch };
    }
}
