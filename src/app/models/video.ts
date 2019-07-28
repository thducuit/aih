export class Video {
  public thumb;
  public description;
  public title;
  public hot;
  constructor(data) {
    this.thumb = data.media_thumb;
    this.description = data.media_description;
    this.title = data.media_title;
    this.hot = data.media_ishot;
  }
}
