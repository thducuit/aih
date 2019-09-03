export class Doctor {
    public id;
    public name;
    public categoryName;
    public shortDesc;
    public longDesc;
    public picturePath;
    public picture;
    public alias;
    public url;
    public doctorId;
    public categoryId;
    public isExpanded;
    public meta;
    public metaDesc;
    public metaKey;
    public metaTitle;
    public categories;
    public sort;
    public publish;

    constructor(data) {
        this.id = data.post_id;
        this.name = data.post_name;
        this.alias = data.alias_name;
        this.categoryName = data.cate_name;
        this.categoryId = data.post_cateid;
        this.shortDesc = data.post_shortdesc;
        this.longDesc = data.post_longdesc;
        this.picture = data.post_picture;
        this.doctorId = data.post_elem01;
        this.metaDesc = data.post_metadesc;
        this.metaKey = data.post_metakey;
        this.metaTitle = data.post_metatitle;
        this.sort = data.post_sort;
        this.publish = data.post_publish;
        this.picturePath = null;
        this.isExpanded = false;
        this.meta = JSON.parse(data.post_meta || '{}');
        this.categories = this.meta.categories ? [...this.meta.categories, this.categoryId] : [this.categoryId];
    }
}
