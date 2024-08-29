
export interface DesignItem {
    id:               number;
    name:             string;
    price:            number;
    prices?:          Price[];
    short_description:      string;
    long_description: string;
    depth:            number;
    order:            number;
    url:              string;
    images:           Image[];
    url_type:         string;
    is_father:        boolean;
    father_id:        number;
    number_children:  number;
    father_name:      string;
    grandfather_id:   number;
    available:         boolean;
    length:           number;
    mandatory:         boolean;
    select:            boolean;
}

export interface DesignRequest {
    id:                number;
    design:            Design;
}

export interface Design {
    id?:                number;
    name?:              string;
    short_description?: string;
    long_description?:  string;
    url?:               string;
    url_type?:          string;
    available?:         boolean;
    role?:              Role[];
    prices?:            Price[];
    mandatory?:         boolean;
    select?:            boolean;
}


export interface Price {
    id_role: number;
    price:   number;
}

export interface Role {
    id_role: number;
}

export interface ImageRequest {
    id: number;
    images: File[];
}

export interface Image {
    image: string;
    order?: number;
}

export interface ImageDelete {
    id_owner: number;
    order: number;
}
