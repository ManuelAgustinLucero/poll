import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { ResponsePoll } from '../core/responsePoll.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css'],
  providers: [AuthService,ResponsePoll],


})
export class EncuestaComponent implements OnInit {
  public send = [];

  constructor(    
    public authService: AuthService,
    private loaderService: Ng4LoadingSpinnerService,
    private route: ActivatedRoute,
    public _FirebaseService: ResponsePoll

    ) { }

 

  ngOnInit() {
    this.loaderService.show();
    this.authService.getBoard(this.route.snapshot.params['id']).subscribe(resp => {
      this.send = resp;
      this.loaderService.hide();
    });
  }


  public currentStep = 0;
  public choseImage = 0;
  public results = [];
  public finsh = false;

  public backgroundTd;

  changeStep(step) {
    this.currentStep = step;
  }

  saveResponse(label: string, value: string) {
    this.currentStep = this.currentStep + 1;
  }

  range(min: number, max: number) {
    var range = []
    for (var index = min; min <= max; index++) {
      range.push(index);
    }
    return range;
  }

  addClass(number: any) {
    this.choseImage = number;
  }

  choiseOption(question: string, value: string) {
    var index = this.results.findIndex(x => x.question === question);
    if (index !== -1) {
      this.results[index] = { question: question, response: value };
    } else {
      this.results.push({ question: question, response: value });
    }
  }

  Text(question: string, event: any) {
    var value = event.target.value;
    var index = this.results.findIndex(x => x.question === question);
    if (index !== -1) {
      this.results[index] = { question: question, response: value };
    } else {
      this.results.push({ question: question, response: value });
    }
  }

  Ready(){
    let response = { respuesta: {idPoll: this.route.snapshot.params['id'], respuestas: this.results}}
    if (this.results.length === 0) return null;
    this.finsh = true;
    this._FirebaseService.postEncuesta(response)
    .subscribe(res => {
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    this.finsh = true;
  }

}
