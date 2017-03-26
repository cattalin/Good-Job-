
export class VideoData{
    link: String;
    description: String;
    constructor(link:String, desc:String){
        this.link=link;
        this.description=desc;
    }
    setData(link:String, desc:String){
        this.link=link;
        this.description=desc;
    }
}