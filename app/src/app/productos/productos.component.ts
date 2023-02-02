import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiproductosService} from '../services/apiproductos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DialogProductoComponent } from './dialog/dialogproducto.component';
import { MatDialog } from '@angular/material/dialog' ;
import { Producto } from '../models/producto';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  public lst: any[] = [];
  public columnas: string[] = ['id', 'nombre', 'precioUnitario', 'costo','actions'];
  readonly width: string = '300px';
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private apiProducto: ApiproductosService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.getProductos();
  }

  
  getProductos(){
    this.apiProducto.getProducto().subscribe(response =>{
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
    const dialogRef = this.dialog.open(DialogProductoComponent, {
      width: this.width
    });
    dialogRef.afterClosed().subscribe(result =>{
      this.getProductos();
      });
  }

  openEdit(producto: Producto){
   const dialogRef = this.dialog.open(DialogProductoComponent,{
    width: this.width,
    data: producto
   });
   dialogRef.afterClosed().subscribe(result =>{
    this.getProductos();
   });
  }

  delete(producto: Producto){
    const dialogRef = this.dialog.open(DialogDeleteComponent,{
      width: this.width,
     });
     dialogRef.afterClosed().subscribe(result =>{
      if(result){
        this.apiProducto.delete(producto.id).subscribe(response => {
          if(response.exito === 1){
              this.snackBar.open('Producto Eliminado Con Éxito', '',{
                duration: 2000
              });
              this.getProductos();
          }
        });
      }
     });
  }


}
