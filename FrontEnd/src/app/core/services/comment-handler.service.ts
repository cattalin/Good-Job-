import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class CommentHandlerService {

  // Observable string sources
  private newCommentSource = new Subject<any>();

  // Observable string streams
  newComment$ = this.newCommentSource.asObservable();

  // Service message commands
  addNewComment(mission: any) {
    this.newCommentSource.next(mission);
  }
}
