export class Schedule {
  public doctorId: string;
  public clinicId: string;
  public dateFrom: string;
  public dateTo: string;
  public timeSlot: number;
  public slot: string[];
  public hrs: string[];


  constructor(data: any) {
    this.doctorId = data.sch_resource_id ? data.sch_resource_id.toUpperCase() : data.sch_resource_id;
    this.clinicId = data.clinical_specialty_rid;
    this.dateFrom = data.effective_from_date_time;
    this.dateTo = data.effective_until_date_time;
    this.timeSlot = data.timeSlot;
    this.slot = this.getSlot(data.arr_time_slot);
    this.hrs = this.getHrs(data.arr_time_slot);
  }

  private getSlot(slotString) {
    const arr = JSON.parse(`[${slotString}]`);
    if (arr) {
      let dateArr = [];
      arr.map(item => {
        if (item && item['id']) {
          dateArr = dateArr.concat(item['id'].split(','));
        }
      });
      return dateArr;
    }
    return arr;
  }

  private getHrs(slotString) {
    const arr = JSON.parse(`[${slotString}]`);
    if (arr) {
      let dateArr = [];
      arr.map(item => {
        if (item && item['hrs']) {
          dateArr = dateArr.concat(item['hrs'].split(','));
        }
      });
      return dateArr;
    }
    return arr;
  }

}

