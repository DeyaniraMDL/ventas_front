import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Venta } from '../models/venta';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { ApiventaService } from '../services/apiventa.service';
import { DialogVentaComponent } from './dialog/dialogventa.component';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.scss']
})
export class VentaComponent implements OnInit {

  public lst: any[] = [];
  public columnas: string[] = ['id', 'fecha', 'nom_cliente','nom_producto', 'cantidad','preciounitario','total', 'editar', 'eliminar'];
  readonly width: string = '600px';
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private apiVenta: ApiventaService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getVentas();
    this.apiVenta.getVenta();
    
  }

 getVentas(){
     this.apiVenta.getVenta().subscribe( response =>{
      this.lst = response.data;
      this.dataSource = new MatTableDataSource(this.lst);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      console.log(this.lst);
     })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /*getConceptos(){
    this.apiVenta.getConcepto().subscribe( response =>{
      this.list = response.data;
      console.log(this.list);
    })
  }*/

  openAdd(){
    const dialogRef = this.dialog.open(DialogVentaComponent,{
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getVentas();
      });
  }

  openEdit(venta: Venta){
    const dialogRef = this.dialog.open(DialogVentaComponent,{
      width: this.width,
      data: venta
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getVentas();
      });
  }

  delete(venta: Venta){
    const dialogRef = this.dialog.open(DialogDeleteComponent,{
      width: this.width,
    });
    dialogRef.afterClosed().subscribe(result =>{
         if(result){
          this.apiVenta.delete(venta.id).subscribe(response =>{
            if(response.exito === 1){
              this.snackBar.open('Venta Eliminada Con Éxito', '',{
                duration: 2000
              });
              this.getVentas();
            }
            if (response.exito === 0) {
              this.snackBar.open('Error Al Eliminar La Venta', '', {
                  duration: 2000
              });
          }
          });
         }
      });
  }


}
