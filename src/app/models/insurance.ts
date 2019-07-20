export class Insurance {
  public id;
  public name;
  public picture;
  public picturePath;
  public shortDesc;
  public longDesc;
  public alias;
  public url;
  public parentId;
  constructor(data) {
    this.id = data.cate_id;
    this.name = data.cate_name;
    this.picture = data.cate_picture;
    this.shortDesc = data.cate_shortdesc;
    this.longDesc = data.cate_longdesc;
    this.alias = data.alias_name;
    this.parentId = data.cate_parentid;
    this.picturePath = null;
    this.url = null;
  }
}
