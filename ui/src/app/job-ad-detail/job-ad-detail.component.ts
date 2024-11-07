import { Component, inject, signal } from '@angular/core';
import { DetailedJob, JobAdsService } from '../job-ads.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { single } from 'rxjs';

@Component({
  selector: 'app-job-ad-detail',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './job-ad-detail.component.html',
  styleUrl: './job-ad-detail.component.css'
})
export class JobAdDetailComponent {
  id: number = 0;
  detailedJob : DetailedJob | undefined = undefined;
  language = signal('');
  displayedtext = signal('');

  constructor(private route: ActivatedRoute) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.jobService.getJobDetails(this.id).then(job => {
      this.detailedJob = job;
    });
    console.log(this.detailedJob)
  }
  
  jobService: JobAdsService = inject(JobAdsService)
  
  async ngOnInit() {
    await this.jobService.getJobDetails(this.id).then(job => {
      this.detailedJob = job;
    });
    console.log(this.detailedJob)
    if(this.detailedJob?.textEN != undefined) {
      this.displayedtext.set(this.detailedJob.textEN)
    }

  }
  
  translate() {
    const translation = this.detailedJob?.translations.find(t => t.language === this.language());
    if (translation) {
      this.displayedtext.set(translation.translatedText);
    }
  }

}
