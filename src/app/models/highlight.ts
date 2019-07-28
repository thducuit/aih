export class Highlight {
  public thumb;
  public description;
  public title;
  constructor(data) {
    this.thumb = data.media_thumb;
    this.description = data.media_description;
    this.title = data.media_title;
  }
}
