import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Meme } from 'src/app/Models/meme';
import { MemeForm } from 'src/app/Models/memeForm';
import { HttpService } from 'src/app/services/http.service';
import { MemeService } from 'src/app/services/meme.service';

@Component({
  selector: 'app-memeform',
  templateUrl: './memeform.component.html',
  styleUrls: ['./memeform.component.css']
})
export class MemeformComponent implements OnInit {

  @Input() meme! : Meme;

  addMemeForm!: FormGroup;
  validationMessages:any;

  constructor(private formBuilder : FormBuilder ,private memeService : MemeService,  private httpservice : HttpService , private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.errorMessages();
  }

  ngOnChanges(changes: SimpleChanges): void 
  {
    // console.log("in the memeform ",changes);
    this.meme = changes.meme.currentValue;
    this.initializeForm();
  }

  initializeForm() {
		this.addMemeForm = this.formBuilder.group({
			name: [!this.isNullOrUndefined(this.meme) ? this.meme.name : '' , Validators.required],
			caption: [!this.isNullOrUndefined(this.meme) ? this.meme.caption : '', [Validators.required]],
			url : [!this.isNullOrUndefined(this.meme) ? this.meme.url : '', Validators.required],
		});
    if(!this.isNullOrUndefined(this.meme))
    {
      // console.log("called");
      this.addMemeForm.controls['name'].disable();
    }
  }

  errorMessages(){
    this.validationMessages = {
      name: 
      [
        { type: 'required', message: 'Name is required.' },
      ],
      caption: 
      [
        { type: 'required', message: 'Caption is required.' },
      ],
      url: 
      [
        { type: 'required', message: 'Caption is required.' },
      ]
    }
  }

  // This will check if the argument is null or undefined, the function from util is depreciated now, so making my own 
  isNullOrUndefined(x : any)
  {
    if(x == null || x== undefined)
    {
      return true;
    }
    return false;
  }

  checkIfNotChanged() : boolean
  {
    // console.log(" called");
    if(this.meme.caption == this.addMemeForm.value.caption && this.meme.url == this.addMemeForm.value.url)
    {
      return true;
    }
    return false;
  }

  // This will add the meme in the database by calling the service method and then do a post request
  addMeme()
  {
    let currMeme : MemeForm = {
      name : this.addMemeForm.value.name,
      caption : this.addMemeForm.value.caption,
      url : this.addMemeForm.value.url,
    };

    this.httpservice.addMeme(currMeme)
    .subscribe(res => {
      this.toastr.success("","Meme Successfully Added");
      // console.log("id is ",res);
      this.closeMemeModal();
    },
    (error : HttpErrorResponse) => {
      if(error.status == 409)
      {
        this.toastr.error("Name Already Exists","Meme Addition Unsuccessful");
      }
      // console.log("error is -",error);
    });
    
  }

  // This will edit the meme which is called when clicking the edit button
  editMeme()
  {
    if(this.checkIfNotChanged())
    {
      this.toastr.warning("Meme Content Not Changed","Meme Edition Unsuccessful");
      return;
    }

    let currMeme : MemeForm = {
      name : this.addMemeForm.value.name,
      caption : this.addMemeForm.value.caption == this.meme.caption ? null : this.addMemeForm.value.caption ,
      url : this.addMemeForm.value.url == this.meme.url ? null : this.addMemeForm.value.url,
    };
    
    this.httpservice.editMeme(currMeme,parseInt(this.meme.id))
    .subscribe(res => {
      this.toastr.success("","Meme Successfully Edited");
      // console.log("meme is ",res);
      this.httpservice.getMemeById(parseInt(this.meme.id))
      .subscribe(currMeme => {
        this.memeService.refreshEditedMeme(currMeme);
      });
      this.closeMemeModal();
    }); 
  }

  // close the modal
  closeMemeModal()
  {
    document.getElementById('closemodalbtn')?.click();
  }


}
