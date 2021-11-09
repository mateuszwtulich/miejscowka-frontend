import { OccupancyTo } from "./OccupancyTo";
import { OpeningHoursTo } from "./OpeningHoursTo";

export class PlaceCto {
    id: number | undefined;
    name: string | undefined;
    capacity: number | undefined;
    description: string | undefined;
    street: string | undefined;
    buildingNumber: string | undefined;
    apartmentNumber: string | undefined;
    categoryName: string | undefined;
    lastOccupancyTo: OccupancyTo | undefined;
    isFavourite: boolean | undefined;
    imageUrl: string | undefined;
    openingHoursTo: OpeningHoursTo | undefined;
}