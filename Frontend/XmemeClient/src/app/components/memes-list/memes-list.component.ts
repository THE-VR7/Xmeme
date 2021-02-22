import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Meme } from 'src/app/Models/meme';
import { HttpService } from 'src/app/services/http.service';
import { MemeService } from 'src/app/services/meme.service';

@Component({
  selector: 'app-memes-list',
  templateUrl: './memes-list.component.html',
  styleUrls: ['./memes-list.component.css']
})
export class MemesListComponent implements OnInit {

  memes : Meme[] = [];

  // This will sent to the meme form
  selectedMeme! : Meme;

  modalRef!: BsModalRef;
	config = {
		backdrop: false,
		keybodard: true,
		animated: true,
		class: 'modal-lg'
	};

  constructor(private httpService : HttpService, private memeService : MemeService, private modalService: BsModalService,) { }


  ngOnInit(): void {
    this.getMemems();

    this.memeService.refreshMeme.subscribe(currMeme => {
      this.updateMeme(currMeme);
    });
  }

  openModal(template: TemplateRef<any>,meme : Meme) {
    this.selectedMeme = meme; 
		this.modalRef = this.modalService.show(template, this.config);
	}
	
	closeModal() {
		this.modalRef.hide();
	}

  getMemems()
  {
    // console.log("get memes called");
    this.httpService.getMemes()
    .subscribe(res => {
      this.memes = res;
      console.log("memes are - ",this.memes);
    });
  }

  updateMeme(meme : Meme)
  {
    let ind =  this.memes.findIndex(x => x.id == meme.id);
    // console.log("index is ",ind);
    this.memes[ind] = meme;
  }


}
