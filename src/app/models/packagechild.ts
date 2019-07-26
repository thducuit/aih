export class Packagechild {
  public id;
  public no;
  public name;
  public meta;
  public parentId;
  public sort;
  constructor(data) {
    this.no = 0;
    this.id = data.cate_id;
    this.name = data.cate_name;
    this.parentId = data.cate_parentid;
    this.meta = data.cate_meta ? JSON.parse(data.cate_meta).package : {};
    this.sort = data.cate_sort;
  }
}
