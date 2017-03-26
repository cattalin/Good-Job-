/**
 * Created by ciprian on 23.03.2017.
 */
export class Collectable {
  public urlVideo: string;
  public description: string;

    constructor(description:string,urlVideo:string){
      this.description=description;
      this.urlVideo=urlVideo;
    }
}
