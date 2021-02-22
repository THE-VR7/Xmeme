import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemeForm } from '../Models/memeForm';
import { Meme } from '../Models/meme';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  route: string = 'http://localhost:5000';

  constructor(private httpService: HttpClient) { }

  addMeme(meme : MemeForm) : Observable<Object>
  {
    return this.httpService.post<Object>(this.route+'/memes', meme);
  }

  editMeme(meme : MemeForm,id : number) : Observable<Meme>
  {
    return this.httpService.patch<Meme>(this.route+'/memes/'+id, meme);
  }

  getMemes() : Observable<Meme[]>
  {
    return this.httpService.get<Meme[]>(this.route+'/memes');
  }

  getMemeById(id : number) : Observable<Meme>
  {
    return this.httpService.get<Meme>(this.route+'/memes/'+id);
  }

}
