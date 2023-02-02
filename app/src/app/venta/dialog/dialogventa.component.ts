import { Component, Inject } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Venta } from "src/app/models/venta";
import { ApiventaService } from "src/app/services/apiventa.service";

@Component({
    templateUrl: 'dialogventa.component.html'
})

 export class DialogVentaComponent{

   public idCliente: number = 0;
   public nombreCliente: string = '';
   public nombreProducto: string ='';
   public idProducto: number = 0;
   public cantidad: number = 0;
   public precioUnitario: number = 0;

    constructor( public dialogRef: MatDialogRef<DialogVentaComponent>, 
                 public snackBar: MatSnackBar,
                 public apiVenta: ApiventaService,
                 @Inject(MAT_DIALOG_DATA) public venta: Venta
        ){
            if(this.venta !== null){
                this.cantidad = venta.cantidad;
                this.precioUnitario = venta.precioUnitario;
                this.idCliente = venta.idCliente;
                this.idProducto = venta.idProducto;
                this.nombreCliente = venta.nombreCliente;
                this.nombreProducto = venta.nombreProducto;
               
            }
        }

        close(){
            this.dialogRef.close();
        }

        addVenta(){
            const venta: Venta = { id: 0, idCliente: this.idCliente, idProducto: this.idProducto, cantidad: this.cantidad, precioUnitario: this.precioUnitario, nombreCliente: this.nombreCliente, nombreProducto: this.nombreProducto };
            this.apiVenta.add(venta).subscribe(response =>{
                if (response.exito === 1) {
                    this.dialogRef.close();
                    this.snackBar.open('Venta Realizada', '', {
                        duration: 2000
                    });
                }
                if (response.exito === 0) {
                    this.dialogRef.close();
                    this.snackBar.open('Error Al Agregar La Venta', '', {
                        duration: 2000
                    });
                }
            });
        }

    editVenta(){
        const venta: Venta = { id: this.venta.id, idCliente: this.venta.idCliente, idProducto: this.venta.idProducto, cantidad: this.cantidad, precioUnitario: this.precioUnitario, nombreCliente: this.nombreCliente, nombreProducto: this.nombreProducto };
        this.apiVenta.edit(venta).subscribe( response =>{
            if (response.exito === 1) {
                this.dialogRef.close();
                this.snackBar.open('Venta Editada Con Éxito', '', {
                    duration: 2000
                });
            }
            if (response.exito === 0) {
                this.dialogRef.close();
                this.snackBar.open('Error Al Editar La Venta', '', {
                    duration: 2000
                });
            }
        });
    }

}