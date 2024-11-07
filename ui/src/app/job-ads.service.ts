import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';


export type JobAd = {
  id: number,
  title: string,
  textEN: string
}
export type DetailedJob = {
  id: number,
  title: string,
  textEN: string,
  translations: [
    {
      language: string,
      translatedText: string
    }
  ]
}

@Injectable({
  providedIn: 'root'
})
export class JobAdsService {
  private httpClient = inject(HttpClient);

  getAllJobAds(): Promise<JobAd[]> {
    return firstValueFrom(this.httpClient.get<JobAd[]>(
      'http://localhost:3000/ads/'
    ))
  }

  deleteJob(id: number) {
    return firstValueFrom(this.httpClient.delete<JobAd[]>(
      'http://localhost:3000/ads/' + id
    ))
  }

  getJobDetails(id: number): Promise<DetailedJob> {
    return firstValueFrom(this.httpClient.get<DetailedJob>(
      'http://localhost:3000/ads/' + id
    ))
  }

  patchJob(id: number, title?: string, textEN?: string) {
    return firstValueFrom(this.httpClient.patch(
      'http://localhost:3000/ads/' + id,
      {
        title,
        textEN
      }
    ));
  }
}
