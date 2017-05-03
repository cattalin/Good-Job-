
export class VideoData{
    _id: String;
    link: String;
    description: String;
    title: String;
    username: String;
    rating: number;
    votes: String

    constructor(_id:String, link:String, desc:String, title:String, username:String, rating:number){
        this._id = _id;
        this.link = link;
        this.description = desc;
        this.title = title;
        this.username = username;
        this.rating = rating;
    }
    setData(link:String, desc:String, title:String, ){
        this.link=link;
        this.description=desc;
    }
}