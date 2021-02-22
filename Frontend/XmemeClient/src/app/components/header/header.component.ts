import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { Meme } from 'src/app/Models/meme';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // This will sent to the meme form
  dummyMeme! : Meme;

  modalRef!: BsModalRef;
	config = {
		backdrop: false,
		keybodard: true,
		animated: true,
		class: 'modal-lg'
	};

  constructor(private toastr: ToastrService,
    private modalService: BsModalService,
    private httpservice : HttpService) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
		this.modalRef = this.modalService.show(template, this.config);
	}
	
	closeModal() {
		this.modalRef.hide();
	}

}
