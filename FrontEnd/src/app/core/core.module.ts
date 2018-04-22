// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Guards
import { AuthGuard } from 'app/core/guards/auth.guard';

//Services
import { ApiService } from 'app/core/api/api.service';
import { AuthenticationService } from 'app/core/api/authentication.service';
import { UserService } from 'app/core/api/user.service';
import { JwtService } from 'app/core/services/jwt.service';
import { VideoService } from 'app/core/api/video.service';
import { CommentService } from 'app/core/api/comment.service';

@NgModule({
    imports: [
      CommonModule,
      HttpClientModule
    ],
    providers: [
        AuthGuard,
        ApiService,
        AuthenticationService,
        UserService,
        JwtService,
        VideoService,
        CommentService
    ]
})
export class CoreModule {

  constructor(){
    console.log('Initializing: Code Module')
  }

}
