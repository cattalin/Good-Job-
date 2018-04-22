import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class CommentHandlerService {

  // Observable string sources
  private newCommentSource = new Subject<string>();

  // Observable string streams
  newComment$ = this.addNewComment.asObservable();

  // Service message commands
  addNewComment(mission: string) {
    this.newCommentSource.next(mission);
  }
}
