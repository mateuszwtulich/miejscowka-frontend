export class PlaceEto {
    id: number;
    name: string;
    street: string;
    buildingNumber: string;
    capacity: number;
    category: string;
    description: string;

    constructor(theName: string, theStreet: string, theBuildingNumber: string, theCapacity: number, theCategory: string, theDescription: string){
        this.id = 0;
        this.name = theName;
        this.description = theDescription;
        this.street = theStreet;
        this.buildingNumber = theBuildingNumber;
        this.capacity = theCapacity;
        this.category = theCategory;
    }
}