export class Comment {
  public id;
  public photo;
  public content;
  public date;
  public name;

  constructor(data) {
    this.id = data.comment_id;
    this.photo = data.comment_avatar;
    this.content = data.comment_message;
    this.date = data.comment_datecreate;
    this.name = data.comment_fullname;
  }

}

// comment_avatar: ""
// comment_datecreate: "2019-08-10T18:00:23.13"
// comment_email: "duc.nguyen@tqdesign.vn"
// comment_fullname: "Đức Nguyễn"
// comment_id: 8
// comment_ispublish: false
// comment_lang: "vi-VN"
// comment_message: "test thu nha"
// comment_objid: 271
// comment_parentid: 0
// comment_social_id: "107884797615256835230"
// comment_social_type: "GOOGLE"
// comment_title: "test thu nha"
// comment_type: "news"
// comment_userid: 0
// post_name: null
// product_name: null
