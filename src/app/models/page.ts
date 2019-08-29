export class Page {
  public id;
  public name;
  public shortDesc;
  public longDesc;
  public picture;
  public metaDesc;
  public metaKey;
  public metaTitle;
  public alias;
  public picturePath;
  public url;
  public meta;
  constructor(data) {
    this.id = data.post_id;
    this.name = data.post_name;
    this.shortDesc = data.post_shortdesc;
    this.longDesc = data.post_longdesc;
    this.picture = data.post_picture;
    this.metaDesc = data.post_metadesc;
    this.metaKey = data.post_metakey;
    this.metaTitle = data.post_metatitle;
    this.meta = data.post_meta ? JSON.parse(data.post_meta) : {};
    this.alias = data.alias_name;
    this.picturePath = null;
    this.url = null;
  }
}
