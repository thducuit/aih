export class InsuranceMedia {
    public id: number;
    public cateid: number;
    public cateName: string;
    public title: string;
    public longdesc: string;
    public thumb: string;
    public description: string;
    public sort: number;

    constructor(data: any) {
        this.id = data.media_id;
        this.cateid = data.media_cateid;
        this.cateName = data.cate_name;
        this.description = data.media_description;
        this.thumb = data.media_thumb;
        this.longdesc = data.media_longdesc;
        this.title = data.media_title;
        this.sort = data.media_sort;
    }
}
