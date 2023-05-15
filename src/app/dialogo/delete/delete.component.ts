import { Component, OnInit, Inject, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Item } from 'src/app/models/empresa';
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit{
constructor(
  private dialogo:MatDialogRef<DeleteComponent>,

  @Inject(MAT_DIALOG_DATA) public datopro: Item
){}
ngOnInit(): void {
    
}

cofirmarDelete(){
  if(this.datopro){
    this.dialogo.close("eliminar")
  }
}
}
