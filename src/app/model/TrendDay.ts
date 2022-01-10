import { Trend } from './Trend';
import { TrendHour } from './TrendHour';

export class TrendDay {
    day!: number;
    trendHourEntities!: TrendHour[];
}