export interface Tour {
    id: string;
    destinationUz: string;
    descriptionUz: string;
    destinationRu: string;
    descriptionRu: string;
    price: string;
    rating: number;
    info: string[];
    imageUrls: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TourMeta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface TourListResponse {
    items: Tour[];
    meta: TourMeta;
}

export interface CreateTourPayload {
    destinationUz: string;
    descriptionUz: string;
    destinationRu: string;
    descriptionRu: string;
    price: number;
    rating: number;
    info: string[];
    imageUrls: string[];
    isActive: boolean;
}

export type UpdateTourPayload = Partial<CreateTourPayload>;

export interface QueryToursParams {
    page?: number;
    limit?: number;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
}

export interface UploadImageResponse {
    url: string;
    jobId: string;
}

export interface UploadImagesResponse {
    items: UploadImageResponse[];
}