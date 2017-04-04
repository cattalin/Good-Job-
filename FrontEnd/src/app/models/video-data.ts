
export class VideoData{
    link: String;
    description: String;
    title: String;
    username: String;
    rating: number;

    constructor(link:String, desc:String, title:String, username:String, rating:number){
        this.link=link;
        this.description=desc;
        this.title=title;
        this.username=username;
        this.rating=rating;
    }
    setData(link:String, desc:String, title:String, ){
        this.link=link;
        this.description=desc;
    }
}