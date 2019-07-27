export class CareerCategory {
  public id;
  public name;
  public picture;
  public shortDesc;
  public longDesc;
  public sort;
  public careers;
  constructor(data) {
    this.id = data.cate_id;
    this.name = data.cate_name;
    this.picture = data.cate_picture;
    this.shortDesc = data.cate_shortdesc;
    this.longDesc = data.cate_longdesc;
    this.sort = data.cate_sort;
    this.careers = [];
  }
}
