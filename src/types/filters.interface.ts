export interface Filter {
    filterName: string;
    filterOption: string;
}

export interface FilterConfig {
    name: string;
    type: 'range' | 'options';
    min?: number;
    max?: number;
    options?: string[];
  }