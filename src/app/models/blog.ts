export class Blog {
  public id;
  public name;
  public categoryName;
  public shortDesc;
  public longDesc;
  public picture;
  public alias;
  public picturePath;
  public url;
  public datepublish;

  constructor(data) {
    this.id = data.post_id;
    this.name = data.post_name;
    this.categoryName = data.cate_name;
    this.shortDesc = data.post_shortdesc;
    this.longDesc = data.post_longdesc;
    this.picture = data.post_picture;
    this.alias = data.alias_name;
    this.picturePath = null;
    this.url = null;
    this.datepublish = new Date(data.post_datepublish);
  }
}
