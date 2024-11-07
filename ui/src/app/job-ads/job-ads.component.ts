import { Component, inject, Inject, signal } from '@angular/core';
import { JobAd, JobAdsService } from '../job-ads.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-ads',
  standalone: true,
  imports: [ FormsModule, CommonModule, RouterModule ],
  templateUrl: './job-ads.component.html',
  styleUrl: './job-ads.component.css'
})
export class JobAdsComponent {
  jobService: JobAdsService = inject(JobAdsService)
  jobs = signal<JobAd[]>([]);


  constructor() {
    this.loadJobs();
  }

  async loadJobs() {
    this.jobs.set(await this.jobService.getAllJobAds());
  }

  async deleteJob(id:number) {
    await this.jobService.deleteJob(id);
    this.loadJobs();
    console.log("deleting" + id);
  }
}