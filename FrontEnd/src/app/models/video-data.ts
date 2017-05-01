
export class VideoData{
    _id: String;
    link: String;
    description: String;
    title: String;
    username: String;
    rating: number;
    votes: String;
    datetime: String;

    constructor(_id:String, link:String, desc:String, title:String, username:String, rating:number,datetime:String){
        this._id = _id;
        this.link = link;
        this.description = desc;
        this.title = title;
        this.username = username;
        this.rating = rating;
        this.datetime = datetime;
    }
    setData(link:String, desc:String, title:String, ){
        this.link=link;
        this.description=desc;
    }
  makeDateAndTime(date:String){
    this.datetime = date.slice(3,16);

  }
}
