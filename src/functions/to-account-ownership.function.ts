import { CompanyOwnership } from "@/types";

export function ToAssignedOwnership(territory_number?: string): CompanyOwnership {
    const userTerritoryNumber = "Northwest"; // temp

    if (!territory_number) {
        return 'N/A';
    }

    return territory_number === userTerritoryNumber ? 'Owned by Me' : 'Not Assigned';
}
