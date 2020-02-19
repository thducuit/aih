export class Clinic {
  public id;
  public name;
  public picture;
  public picturePath;
  public shortDesc;
  public longDesc;
  public alias;
  public url;
  public clinicId;
  public metaDesc;
  public metaKey;
  public metaTitle;
  public datepublish;
  public meta;
  public active;
  public isShow;
  public deferLoaded = false;

  constructor(data) {
    this.id = data.cate_id;
    this.name = data.cate_name;
    this.picture = data.cate_picture;
    this.shortDesc = data.cate_shortdesc;
    this.longDesc = data.cate_longdesc;
    this.alias = data.alias_name;
    this.clinicId = data.cate_elem01;
    this.isShow = data.cate_publish;
    this.metaDesc = data.cate_metadesc;
    this.metaKey = data.cate_metakey;
    this.metaTitle = data.cate_metatitle;
    this.datepublish = data.cate_datepublish;
    this.meta = JSON.parse(data.cate_meta || '{}');
    this.picturePath = null;
    this.url = null;
  }
}
