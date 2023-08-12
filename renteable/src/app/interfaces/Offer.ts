export interface Offer {
    _id?: string,
    name: string | null | undefined,
    category: string | null | undefined,
    description: string | null | undefined,
    pricePerDay: number | null | undefined,
    imageUrl: string | null | undefined,
    location: string | null | undefined,
    ownerId?: string,
    ownerName?: string
    requestedBy?: string[]
}