
export interface DesignItem {
    id:               number;
    titulo:           string;
    description:      string;
    more_description: string;
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
    length:           number;
}

export interface DesignRequest {
    id:                number;
    design:            Design;
}

export interface Design {
    id?:               number;
    titulo?:           string;
    description?:      string;
    more_description?: string;
    url?:              string;
    url_type?:         string;
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
