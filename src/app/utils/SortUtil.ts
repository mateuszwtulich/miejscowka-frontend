export class SortUtil {
    static compare(a: number | string | undefined, b: number | string | undefined, isAsc: boolean): number {
        if (a !== undefined && b !== undefined) {
            return ((a < b ? -1 : 1) * (isAsc ? 1 : -1));
        } else if (a === undefined) {
            return (-1 * (isAsc ? 1 : -1));
        } else if (b === undefined) {
            return (1 * (isAsc ? 1 : -1));
        } else {
            return 0;
        }
    }
}