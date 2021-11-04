/**
 * Model for {@link DurationEditorComponent}
 */
 export class DurationEditorDataModel {
    /**
     * Number of days
     */
    days: number;
  
    /**
     * Number of hours
     */
    hours: number;
  
    /**
     * Number of minutes
     */
    minutes: number;
  
    /**
     * Default constructor
     */
    constructor() {
      this.days = 0;
      this.hours = 0;
      this.minutes = 0;
    }
  }
  