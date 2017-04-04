
export class VideoData{
    link: String;
    description: String;
    title: String;
    user: String;
    rating: number;

    constructor(link:String, desc:String){
        this.link=link;
        this.description=desc;
    }
    setData(link:String, desc:String, title:String, ){
        this.link=link;
        this.description=desc;
    }
}