import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Producto } from 'src/app//models/producto';
import { ApiproductosService } from "src/app/services/apiproductos.service";

@Component({
    templateUrl: 'dialogproducto.component.html'
})

export class DialogProductoComponent{
   public nombre: string ='';
   public precioUnitario: number = 0;
   public costo: number = 0;

  constructor(
    public dialogRef: MatDialogRef<DialogProductoComponent>,
    public apiProductos: ApiproductosService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public producto: Producto
  ) {
    if(this.producto !== null){
        this.nombre = producto.nombre;
        this.precioUnitario = producto.precioUnitario;
        this.costo = producto.costo;
    }
  }

  close(){
      this.dialogRef.close();
  }

  editProducto(){
    const producto: Producto = { nombre: this.nombre, id: this.producto.id, precioUnitario: this.precioUnitario, costo: this.costo };
    this.apiProductos.edit(producto).subscribe( response =>{
        if (response.exito === 1){
            this.dialogRef.close();
            this.snackBar.open('Producto Editado Con Éxito','',{
                duration: 2000
            });
        }
    });
  }

  addProducto(){
      const producto: Producto = {nombre: this.nombre, id: 0, precioUnitario: this.precioUnitario, costo: this.costo };
      this.apiProductos.add(producto).subscribe( response =>{
          if (response.exito === 1){
              this.dialogRef.close();
              this.snackBar.open('Producto Agregado Con Éxito','',{
                  duration: 2000
              });
          } 
      });
  }

}