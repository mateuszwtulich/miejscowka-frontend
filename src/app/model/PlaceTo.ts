import { OpeningHoursTo } from "./OpeningHoursTo";

export class PlaceTo {
    name: string | undefined;
    capacity: string | undefined;
    description: string | undefined;
    street: string | undefined;
    buildingNumber: string | undefined;
    apartmentNumber: string | undefined;
    categoryId: number | undefined;
    imageName: string | undefined;
    base64Image: string | undefined;
    openingHoursTo: OpeningHoursTo | undefined;
}