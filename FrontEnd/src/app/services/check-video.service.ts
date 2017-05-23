import { Injectable } from '@angular/core';
@Injectable()
export class CheckVideoService {

  constructor() { }
  checkURL(url){//copiata de pe stack overflow, expresie regulara p
     var p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    //use this in the furure   https://www.youtube.com/oembed?format=json&url=
    if(url!=null && url.match(p)){
        return true;
    }
    return false;
}
}
