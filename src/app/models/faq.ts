export class Faq {
  public id: number;
  public cateid: number;
  public title: string;
  public description: string;

  constructor(data) {
    this.id = data.media_id;
    this.cateid = data.media_cateid;
    this.title = data.media_title;
    this.description = data.media_description;
  }
}
