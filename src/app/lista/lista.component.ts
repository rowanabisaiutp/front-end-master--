
import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Item } from '../models/empresa';
import { ServicioService } from '../Services/servicio.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogoComponent } from '../dialogo/dialogo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteComponent } from '../dialogo/delete/delete.component';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements AfterViewInit, OnInit{

  items: Item[] = [];
  page = 1;
  pageSize = 20;

  constructor(private servicio:ServicioService, private dialog: MatDialog, private snak:MatSnackBar){}

    ngOnInit(): void {
this.Mostrarem();
  }

  displayedColumns: string[] = ['id', 'Nombre', 'Precio', 'Acciones'];
  dataSource = new MatTableDataSource<Item>(this.items);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Mostrarem(){
  //   this.servicio.getAll().subscribe({
  //     next:(dataResponse) => {
  //       console.log(dataResponse)
  //       this.dataSource.data = dataResponse;
  //     }, error:(e) =>{}
  //   })
  // }
  Mostrarem(){
     this.servicio.getData(this.page, this.pageSize).subscribe({
      next:(dataResponse) => {
              console.log(dataResponse)
              this.dataSource.data = dataResponse;
            }, error:(e) =>{}
  });
  }

  openDialog() {
    this.dialog.open(DialogoComponent, {
      disableClose:true,
      width:"350px"
    }).afterClosed().subscribe(resultado =>{
      if (resultado === "creado") {
        this.Mostrarem();
      }
    })
  }

  editDialog(datoPro:Item) {
    this.dialog.open(DialogoComponent, {
      disableClose:true,
      width:"350px",
      data:datoPro
    }).afterClosed().subscribe(resultado =>{
      if (resultado === "editado") {
        this.Mostrarem();
      }
    })
  }

  mostrarAlerta(message: string, action: string) {
    this.snak.open(message, action,{
      horizontalPosition: "end",
      verticalPosition: "top",
      duration:3000
    });
  }

  dialogoEliminar(datoPro:Item){
    this.dialog.open(DeleteComponent, {
      disableClose:true,
      width:"350px",
      data:datoPro
    }).afterClosed().subscribe(resultado =>{
      if (resultado === "eliminar") {
        this.servicio.delete(datoPro.id).subscribe({
          next:(data)=>{
            this.mostrarAlerta("producnto eliminado", "listo");
             this.Mostrarem();
          }, error:(e) => {}
        })
       
      }
    })
  }


}

 




// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];
