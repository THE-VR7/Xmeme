import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meme } from '../Models/meme';

@Injectable({
  providedIn: 'root'
})
export class MemeService {

  constructor(private httpService: HttpClient) { }
  dummyMeme! : Meme;
  private messageSource = new BehaviorSubject<Meme>(this.dummyMeme);
  refreshMeme = this.messageSource.asObservable();

  refreshEditedMeme(meme : Meme)
  {
    this.messageSource.next(meme);
  }
  

}
