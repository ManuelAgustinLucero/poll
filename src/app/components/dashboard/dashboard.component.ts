import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../services/dashboard.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { BaseComponent } from '../../core/base.component';

import * as jsPDF from 'jspdf';
declare var jsPDF: any; // Important
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]

})
export class DashboardComponent extends BaseComponent implements OnInit {

  public estadisticas ;
  public itemTotal=0;
  today: number = Date.now();
  constructor(
    private _DashboardService: DashboardService,
    private spinnerService: Ng4LoadingSpinnerService,
    private toastr: ToastrService) {
    super(
    );
  }
 

  ngOnInit() {
   // this.getEstadistica();
  }
  getEstadistica() {
    this.spinnerService.show();
    this._DashboardService.getEstadistica().subscribe(data => {
      this.estadisticas = data;
      console.log(this.estadisticas);
      this.toastr.success('Bienvenido !');
      this.spinnerService.hide();

    });
  }


  porcentaje(real: number, last: number) {
    return Math.round(((real - last) / last) * 100) + "%";
  }

  getTotal(key:string){
    var total=0;
    var array;
    if(key == "socios"){
      array=this.estadisticas.MonthTotalNewSocio;
    }else{
      array=this.estadisticas.MonthTotalNewSocio;
    }
    array.forEach(element => {
      total=total+element.total;
    });
    return total;
  }

  functionMonth(month: string) {
    switch (month) {
      case "1":
        return "Enero";
      case "2":
        return "Febrero";
      case "3":
        return "Marzo";
      case "4":
        return "Abril";
      case "5":
        return "Mayo";
      case "6":
        return "Junio";
      case "7":
        return "Julio";
      case "8":
        return "Agosto";
      case "9":
        return "Septiembre";
      case "10":
        return "Octubre";
      case "11":
        return "Noviembre";
      default:
        return "Diciembre";
    }
  }
  Porcentaje(cupo:number,cantidad:number){
    return Math.round((cantidad*100)/cupo);
  }


  ExportSocios() {
    var dataPrint= [];
    this.estadisticas.MonthTotalNewSocio.forEach((element, key) => {
      dataPrint[key] = {nombre:  this.functionMonth(element.mes), socios: element.total};
    });
    var columns = [
      { title: "Mes", dataKey: "nombre" },
      { title: "Socios", dataKey: "socios" },
    ];
    var doc = new jsPDF('p', 'pt');
    doc.autoTableSetDefaults({
      headerStyles: { fillColor: [41, 128, 185] }
    });
    doc.autoTable(columns,dataPrint, {
      theme: 'grid',
      margin: { horizontal: 7 },
      bodyStyles: { valign: 'top' },
      styles: { overflow: 'linebreak', columnWidth: 'wrap' },
      columnStyles: {
        nombre: { columnWidth: 'auto' },socios: { columnWidth: 'auto' }
      },
      addPageContent: function (data) {
        var date= new Date();
        doc.text("Lista de socios por mes", 7, 30);
        doc.text((date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()), 510, 30);
      }
    });
      // Reset defaults
      doc.autoTableSetDefaults(null);
      jsPDF.autoTableSetDefaults(null);
    // doc.save('table.pdf');
    var blob = doc.output("blob");
    window.open(URL.createObjectURL(blob));
  }

  ExportIngresos() {
    var dataPrint= [];
    this.estadisticas.MonthTotalPagos.forEach((element, key) => {
      dataPrint[key] = {nombre:  this.functionMonth(element.mes), total: element.total};
    });
    var columns = [
      { title: "Mes", dataKey: "nombre" },
      { title: "Importe", dataKey: "total" },
    ];
    var doc = new jsPDF('p', 'pt');
    doc.autoTableSetDefaults({
      headerStyles: { fillColor: [41, 128, 185] }
    });
    doc.autoTable(columns,dataPrint, {
      theme: 'grid',
      margin: { horizontal: 7 },
      bodyStyles: { valign: 'top' },
      styles: { overflow: 'linebreak', columnWidth: 'wrap' },
      columnStyles: {
        nombre: { columnWidth: 'auto' },total: { columnWidth: 'auto' }
      },
      addPageContent: function (data) {
        var date= new Date();
        doc.text("Lista de ingresos por mes", 7, 30);
        doc.text((date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()), 510, 30);
      }
    });
      // Reset defaults
      doc.autoTableSetDefaults(null);
      jsPDF.autoTableSetDefaults(null);
    // doc.save('table.pdf');
    var blob = doc.output("blob");
    window.open(URL.createObjectURL(blob));
  }

  ExportSociosOnline() {
    var dataPrint= [];
    this.estadisticas.sociosOnlinePorArea.forEach((element, key) => {
      dataPrint[key] = {area:  element.area, cantidad: element.cantidad, cupo:element.cupo };
    });
    var columns = [
      { title: "Area", dataKey: "area" },
      { title: "Cantidad", dataKey: "cantidad" },
      { title: "Cupo Maximo", dataKey: "cupo" },

    ];
    var doc = new jsPDF('p', 'pt');
    doc.autoTableSetDefaults({
      headerStyles: { fillColor: [41, 128, 185] }
    });
    doc.autoTable(columns,dataPrint, {
      theme: 'grid',
      margin: { horizontal: 7 },
      bodyStyles: { valign: 'top' },
      styles: { overflow: 'linebreak', columnWidth: 'wrap' },
      columnStyles: {
        area: { columnWidth: 'auto' },cantidad: { columnWidth: 'auto' },cupo: { columnWidth: 'auto' }
      },
      addPageContent: function (data) {
        var date= new Date();
        doc.text("Socios online por area", 7, 30);
        doc.text((date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()), 510, 30);
      }
    });
      // Reset defaults
      doc.autoTableSetDefaults(null);
      jsPDF.autoTableSetDefaults(null);
    // doc.save('table.pdf');
    var blob = doc.output("blob");
    window.open(URL.createObjectURL(blob));
  }
}
