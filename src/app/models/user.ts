export class User {

  public id;
  public name;
  public type;
  public photo;

  constructor(data, type) {
    if (type === 'google') {
      this.type = 'google';
      this.id = data.id;
      this.name = data.name;
      this.photo = data.photo;
    }

    if (type === 'facebook') {
      this.type = 'facebook';
      this.id = data.id;
      this.name = data.name;
      this.photo = data.photo;
    }
  }
}
