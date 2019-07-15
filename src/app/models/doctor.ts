export class Doctor {
  public id;
  public name;
  public categoryName;
  public shortDesc;
  public picture;
  constructor(data) {
    this.id = data.post_id;
    this.name = data.post_name;
    this.categoryName = data.cate_name;
    this.shortDesc = data.post_shortdesc;
    this.picture = data.post_picture;
  }
}
