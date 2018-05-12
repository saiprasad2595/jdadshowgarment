import { HttpModule } from '@angular/http';

import { UserService } from './user.service';
import { LoadingService } from './loader.service';
import { MainService } from './main.service';
import { AuthService } from './auth.service';
export {
    UserService, LoadingService, MainService,
     AuthService
};

export default [HttpModule,
    UserService,
    LoadingService,
    MainService,
    AuthService
];
