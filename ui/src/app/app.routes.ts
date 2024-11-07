import { Routes } from '@angular/router';
import { JobAdsComponent } from './job-ads/job-ads.component';
import { JobAdDetailComponent } from './job-ad-detail/job-ad-detail.component';

export const routes: Routes = [
    { path: 'jobAds', component: JobAdsComponent },
    { path: 'jobAds/:id', component: JobAdDetailComponent },
    { path: '', pathMatch: 'full', redirectTo: '/jobAds' }
];