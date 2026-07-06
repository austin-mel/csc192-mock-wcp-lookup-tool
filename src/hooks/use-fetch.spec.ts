import { mount } from "@vue/test-utils"
import { defineComponent, nextTick, Ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useFetch } from "./use-fetch.hook";


describe("useFetch.hook", () => {
    interface APIResponseMock {
        key: string;
    }

    interface ComponentStubSetup {
        data:       Ref<APIResponseMock | null>;
        error:      Ref<string | null>;
        is_loading: Ref<boolean>
    }

    afterEach(() => {
        vi.resetAllMocks();
    });


    it("should fetch data on mount when 'fetchOnMount' option in true", async () => {
        const mock_data: APIResponseMock = { key: 'value' };

        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok:   true,
                json: () => Promise.resolve(mock_data),
            } as Response)
        ) as unknown as typeof fetch;

        const ComponentStub = defineComponent({
            template: `<div></div>`,
            setup(): ComponentStubSetup {
                const { data, error, is_loading } = useFetch<APIResponseMock>(
                    'http://hostname.unknown/api',
                    { fetchOnMount: true },
                );
                
                return { data, error, is_loading };
            },
        });


        const wrapper = mount(ComponentStub);
        expect(wrapper.vm.is_loading).toBe(true);

        await nextTick();
        await new Promise((resolve) => setTimeout(resolve, 0));
        
        expect(global.fetch).toBeCalledWith('http://hostname.unknown/api', {});
        expect(wrapper.vm.data).toStrictEqual(mock_data);
        expect(wrapper.vm.error).toBe(null);
        expect(wrapper.vm.is_loading).toBe(false);
    });


    it("should handle error when fetch returns a non-ok response", async () => {
        global.fetch = vi.fn(() =>
            Promise.resolve({
                ok:         false,
                status:     404,
                statusText: "Not Found"
            } as Response)
        ) as unknown as typeof fetch;

        const ComponentStub = defineComponent({
            template: `<div></div>`,
            setup(): ComponentStubSetup {
                const { data, error, is_loading } = useFetch<APIResponseMock>(
                    'http://hostname.unknown/api',
                    { fetchOnMount: true },
                );
                
                return { data, error, is_loading };
            },
        });


        const wrapper = mount(ComponentStub);
        expect(wrapper.vm.is_loading).toBe(true);

        await nextTick();
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(global.fetch).toBeCalledWith('http://hostname.unknown/api', {});
        expect(wrapper.vm.data).toBe(null);
        expect(wrapper.vm.error).toBe('Error: 404 Not Found');
        expect(wrapper.vm.is_loading).toBe(false);
    });


    it("should allow manual re-fetching", async () => {
        let   call_count                       = 0;
        const first_response:  APIResponseMock = { key: 'first_response'  };
        const second_response: APIResponseMock = { key: 'second_response' };

        global.fetch = vi.fn(() => {
            ++call_count;
            if (call_count == 1) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(first_response),
                } as Response)
            }
            
            return Promise.resolve({
                ok: true,
                json: () => Promise.resolve(second_response),
            } as Response)
        }) as unknown as typeof fetch;


        let refetch_fn: () => Promise<void>;
        const ComponentStub = defineComponent({
            template: `<div></div>`,
            setup(): ComponentStubSetup {
                const { data, error, is_loading, refetch } = useFetch<APIResponseMock>(
                    'http://hostname.unknown/api',
                    { fetchOnMount: false },
                );
                refetch_fn = refetch;
                
                return { data, error, is_loading };
            },
        });


        const wrapper = mount(ComponentStub);
        expect(global.fetch).not.toHaveBeenCalled();
        expect(wrapper.vm.is_loading).toBe(false);

        refetch_fn!();
        await nextTick();
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(global.fetch).toBeCalledTimes(1);
        expect(wrapper.vm.data).toEqual(first_response);
        expect(wrapper.vm.error).toBe(null);
        expect(wrapper.vm.is_loading).toBe(false);

        refetch_fn!();
        await nextTick();
        await new Promise((resolve) => setTimeout(resolve, 0));

        expect(global.fetch).toBeCalledTimes(2);
        expect(wrapper.vm.data).toEqual(second_response);
        expect(wrapper.vm.error).toBe(null);
        expect(wrapper.vm.is_loading).toBe(false);
    });
})