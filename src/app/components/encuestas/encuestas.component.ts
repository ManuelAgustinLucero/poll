import { Component, OnInit } from '@angular/core';
import { SociosService } from '../../services/socio.service';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../access/core/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.component.html',
  styleUrls: ['./encuestas.component.css'],
  providers: [SociosService,AuthService]

})
export class EncuestasComponent implements OnInit {

  constructor( public authService: AuthService,
    private loaderService: Ng4LoadingSpinnerService,
    ) { }
  public data = [];
  ngOnInit() {
   // console.log(this.fs.getAll());
    this.getAll();

  }

  getAll(){
    this.loaderService.show();
    this.authService.getBoards().subscribe(resp => {
      this.data = resp;
      this.loaderService.hide();

    });
  }
  deleteBoard(id) {
    this.authService.deleteBoards(id)
      .subscribe(res => {
          this.getAll();
        }, (err) => {
          console.log(err);
        }
      );
  }
}
