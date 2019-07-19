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
  constructor(data) {
    this.id = data.post_id;
    this.name = data.post_name;
    this.shortDesc = data.post_shortdesc;
    this.longDesc = data.post_longdesc;
    this.picture = data.post_picture;
    this.metaDesc = data.post_metadesc;
    this.metaKey = data.post_metakey;
    this.metaTitle = data.post_metatitle;
    this.alias = data.alias_name;
    this.picturePath = null;
    this.url = null;
  }
}
