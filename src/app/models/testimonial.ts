export class Testimonial {
  public id: number;
  public cateid: number;
  public title: string;
  public longdesc: string;
  public thumb: string;
  public description: string;

  constructor(data: any) {
    this.id = data.media_id;
    this.cateid = data.media_cateid;
    this.description = data.media_description;
    this.thumb = data.media_thumb;
    this.longdesc = data.media_longdesc;
    this.title = data.media_title;
  }
}
