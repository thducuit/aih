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
  public metaDesc;
  public metaKey;
  public metaTitle;
  public meta;
  public sort;
  public iframeUrl;
  public isHot;
  public clinicIds;
  public totalComments;
  public totalLikes;
  public isShow;

  constructor(data) {
    this.id = data.post_id;
    this.name = data.post_name;
    this.categoryName = data.cate_name;
    this.shortDesc = data.post_shortdesc;
    this.longDesc = data.post_longdesc;
    this.sort = data.post_sort;
    this.alias = data.alias_name;
    this.metaDesc = data.post_metadesc;
    this.metaKey = data.post_metakey;
    this.metaTitle = data.post_metatitle;
    this.isShow = data.post_publish;
    this.isHot = data.post_ishot ? 1 : 0;
    this.meta = data.post_meta ? JSON.parse(data.post_meta) : {};
    this.clinicIds = this.meta.clinic_ids || [];
    this.picture = this.meta.picture ? this.meta.picture : data.post_picture;
    this.picturePath = null;
    this.url = null;
    this.iframeUrl = null;
    this.datepublish = new Date(data.post_datepublish);
  }
}
