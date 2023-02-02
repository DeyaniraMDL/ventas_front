import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Cliente } from "src/app/models/cliente";
import { ApiclienteService } from "src/app/services/apicliente.service";

@Component({
    templateUrl: 'dialogcliente.component.html'
})

export class DialogClienteComponent{
   public nombre: string ='';
   public correo: string ='';
   public rfc: string ='';

  constructor(
    public dialogRef: MatDialogRef<DialogClienteComponent>,
    public apiCliente: ApiclienteService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public cliente: Cliente
  ) {
    if(this.cliente !== null){
        this.nombre = cliente.nombre;
        this.correo = cliente.correo;
        this.rfc = cliente.rfc;
    }
  }

  close(){
      this.dialogRef.close();
  }

  editCliente(){
    const cliente: Cliente = { nombre: this.nombre, id: this.cliente.id, correo: this.correo, rfc: this.rfc };
    this.apiCliente.edit(cliente).subscribe( response =>{
        if (response.exito === 1){
            this.dialogRef.close();
            this.snackBar.open('Cliente Editado Con Éxito','',{
                duration: 2000
            });
        }
    });
  }

  addCliente(){
      const cliente: Cliente = { nombre: this.nombre, id: 0, correo: this.correo, rfc: this.rfc};
      this.apiCliente.add(cliente).subscribe( response =>{
          if (response.exito === 1){
              this.dialogRef.close();
              this.snackBar.open('Cliente Agregado Con Éxito','',{
                  duration: 2000
              });
          } 
      });
  }

}