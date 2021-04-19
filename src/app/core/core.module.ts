import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';
import { StorageService } from './storage/storage.service';
import { HttpClientModule} from '@angular/common/http';
import { DashboardService } from './services/dashboard.service';

@NgModule({
    imports: [
        HttpClientModule
    ],
    exports: [
        HttpClientModule
    ],
    declarations: [],
    providers: [
        AuthGuard,
        StorageService,
        DashboardService

    ],
})
export class CoreModule { }
