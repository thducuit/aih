export class Package {
  public id;
  public name;
  public parentId;
  public sort;
  public meta;
  public desc;
  constructor(data) {
    this.id = data.cate_id;
    this.name = data.cate_name;
    this.parentId = data.cate_parentid;
    this.sort = data.cate_sort;
    this.desc = data.cate_shortdesc;
    this.meta = data.cate_meta ? JSON.parse(data.cate_meta) : {};
  }
}
