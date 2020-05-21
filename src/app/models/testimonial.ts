import { escapeHtml, extractHtmlText } from '../utilities';

export class Testimonial {
  public id: number;
  public cateid: number;
  public sort: number;
  public title: string;
  public longdesc: string;
  public thumb: string;
  public description: string;

  constructor(data: any) {
    this.id = data.media_id;
    this.cateid = data.media_cateid;
    this.sort = data.media_sort;
    this.description = data.media_description;
    this.thumb = data.media_thumb;
    this.longdesc = data.media_longdesc; // `${extractHtmlText(escapeHtml())}`.trim();
    this.title = data.media_title;
  }
}
