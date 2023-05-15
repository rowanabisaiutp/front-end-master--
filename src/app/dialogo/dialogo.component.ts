import { Component, OnInit, Inject, inject } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { Item } from '../models/empresa';
import { ServicioService } from '../Services/servicio.service';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit{
  page = 1;
  pageSize = 20;
  formItem: FormGroup;
  nombreAccion: string="nuevo";
  botonAccion: string="guardar";

  listasProductos: Item[]=[];
constructor(
  private dialogo:MatDialogRef<DialogoComponent>,
  private fb:FormBuilder,
  private snak: MatSnackBar,
  private servicio: ServicioService,
  @Inject(MAT_DIALOG_DATA) public datopro: Item
){
  this.formItem= this.fb.group({
    nombre: ["",Validators.required],
    precio: ["",Validators.required]
  })

  this.servicio.getData(this.page, this.pageSize).subscribe({
    next:(data)=>{
      this.listasProductos = data;
    },error:(e)=>{}
  })
}

mostrarAlerta(message: string, action: string) {
  this.snak.open(message, action,{
    horizontalPosition: "end",
    verticalPosition: "top",
    duration:3000
  });
}



ngOnInit(): void {

  if(this.datopro){
    this.formItem.patchValue({
      
       nombre: this.datopro.nombre,
       precio: this.datopro.precio
    })
    this.nombreAccion= "editar";
    this.botonAccion="actualizar";
  }
    
}


addProductEdit(){
  console.log(this.formItem.value);
  
  const modelo: Item ={
    id: 0,
    nombre: this.formItem.value.nombre,
    precio: this.formItem.value.precio
  }

  if(this.datopro == null){
      this.servicio.add(modelo).subscribe({
    next:(data)=>{
      this.mostrarAlerta("insertado", "listo");
      this.dialogo.close("creado");
    }, error:(e)=>{
      this.mostrarAlerta("no se pudo crear","error");
    }
  })
  }else{
    this.servicio.update(this.datopro.id,modelo).subscribe({
      next:(data)=>{
        this.mostrarAlerta("insertado", "listo");
        this.dialogo.close("editado");
      }, error:(e)=>{
        this.mostrarAlerta("no se pudo editar","error");
      }
    })
  }

}

}
