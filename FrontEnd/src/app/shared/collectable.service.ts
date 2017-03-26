/**
 * Created by ciprian on 23.03.2017.
 */
import { Collectable } from "./collectable.models";
export class CollectableVideos{
  private collectables : Collectable[] = [
    {description:"XXXXXX1",urlVideo:"http:/xxxxxxxxxx1"},
    {description:"XXXXXX2",urlVideo:"http:/xxxxxxxxxx2"},
    {description:"XXXXXX3",urlVideo:"http:/xxxxxxxxxx3"},
    {description:"XXXXXX4",urlVideo:"http:/xxxxxxxxxx4"},
    {description:"XXXXXX5",urlVideo:"http:/xxxxxxxxxx5"}
  ];
    constructor(){

    }
  getCollectables(){
    return this.collectables;
  }
}
