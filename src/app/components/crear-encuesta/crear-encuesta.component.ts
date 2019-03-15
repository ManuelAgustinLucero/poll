import { Component, OnInit, ViewChild } from '@angular/core';
import { SociosService } from '../../services/socio.service';
import { Radio } from '../../models/radio.class';
import { Question } from '../../models/question.class';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../access/core/auth.service';
import { Router } from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-socio',
  templateUrl: './crear-encuesta.component.html',
  styleUrls: ['./crear-encuesta.component.css'],
  providers: [SociosService,AuthService]

})
export class CrearEncuestaComponent implements OnInit {

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  public radio = new Radio();
  public radios =  [];
  public question = new Question();
  public send = [];

  public data = [];

  public InputsImage = [
    {
      value: "nice",
      img: "https://surveymonkey-assets.s3.amazonaws.com/survey/157469414/image_choice/301c1f71-eaf7-435f-bfba-b29bcb27d998.png",
    },
    {
      value: "nice",
      img: "https://surveymonkey-assets.s3.amazonaws.com/survey/157469414/image_choice/ab1c55b8-ce51-43d6-8827-394f74d407e7.png",
    },
    {
      value: "nice",
      img: "https://surveymonkey-assets.s3.amazonaws.com/survey/157469414/image_choice/f2c5fcc7-ca44-4f3a-ab6b-963b874ec780.png",
    },
    {
      value: "nice",
      img: "https://surveymonkey-assets.s3.amazonaws.com/survey/157469414/image_choice/a70ec9fd-2af8-44d7-8564-a2947b29f401.png",

    },
    {
      value: "fail",
      img: "https://surveymonkey-assets.s3.amazonaws.com/survey/157469414/image_choice/994dfc9a-6a43-41a7-98ee-42901e54da00.png",
    }]

  constructor(
    public _FirebaseService: AuthService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.loadDropSetting();
  }

  loadDropSetting() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Radio' },
      { item_id: 2, item_text: 'Imagen' },
      { item_id: 3, item_text: 'Rango' },
      { item_id: 4, item_text: 'Texto' },

    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };
  }
  onSubmitRadioOption() {
    this.radios.push({ value:this.radio.value,label:this.radio.label});
    this.radio = new Radio();
  }

  onSubmitRadio() {
    this.send.push({ type: this.question.type, question: this.question.questionLabel, questionsInputs: this.radios });
    this.clean()

  }
  onSubmitImage() {
    this.send.push({ type: this.question.type, question: this.question.questionLabel, questionsInputs: this.InputsImage });
    this.clean()

  }
  onSubmitTexto() {
    this.send.push({ type: this.question.type, question: this.question.questionLabel });
    this.clean()
  }

  onSubmitRango() {
    this.send.push({ type: this.question.type, question: this.question.questionLabel, firstText: this.question.firstText, secondText: this.question.firstText })
    this.clean()
  }

  onItemSelect(item: any) {
    this.question.type = item.item_text;
  }

  clean() {
    this.question = new Question();
    this.radio = new Radio();
    this.radios = new Array<Radio>();
    this.loadDropSetting();
    console.log(this.send);
  }

  onSubitFirebase(){
    this._FirebaseService.postEncuesta({encuesta:this.send})
    .subscribe(res => {
      this.router.navigate(['layout/encuestas']);
        console.log(res);
      }, (err) => {
        console.log(err);
      });
  }
}
