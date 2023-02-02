import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiclienteService } from '../services/apicliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog} from '@angular/material/dialog' ;
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogClienteComponent } from './dialog/dialogcliente.component';
import { Cliente } from '../models/cliente';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';



@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
//implementar OnInit
export class ClienteComponent implements OnInit {
  public lst: any[] = [];
  public columnas: string[] = ['id', 'nombre', 'correo', 'rfc','actions'];
  readonly width: string = '300px';
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiCliente: ApiclienteService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,

  ) {  }

  ngOnInit() {
    this.getClientes();
  }
  /*ngAfterViewInit() {
    this.getClientes();
    this.dataSource.paginator = this.paginator;
  }*/

  getClientes(){
    this.apiCliente.getCliente().subscribe(response =>{
    this.lst = response.data;
    this.dataSource = new MatTableDataSource(this.lst);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    console.log(this.lst);
  });    
}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAdd(){
    const dialogRef = this.dialog.open(DialogClienteComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getClientes();
      });
  }

  openEdit(cliente: Cliente){
   const dialogRef = this.dialog.open(DialogClienteComponent,{
    width: this.width,
    data: cliente
   });
   dialogRef.afterClosed().subscribe(result =>{
    this.getClientes();
   });
  }

  delete(cliente: Cliente){
    const dialogRef = this.dialog.open(DialogDeleteComponent,{
      width: this.width,
     });
     dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.apiCliente.delete(cliente.id).subscribe(response => {
          if(response.exito === 1){
              this.snackBar.open('Cliente Eliminado Con Éxito', '',{
                duration: 2000
              });
              this.getClientes();
          }
        });
      }
     });
  }

}
