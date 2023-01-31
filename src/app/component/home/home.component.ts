import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/users.service';
import { HttpClient } from '@angular/common/http';
import { product } from 'src/app/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  title: string = ""
  description: string = ""
  products: product[]
  curPage: number = 1
  curProducts: product[]
  maxLen: number

  constructor(protected userService: UsersService, public datepipe: DatePipe, private http: HttpClient) {
    let currentDateTime =this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss:sss');
  
    console.log(currentDateTime);
   }

  ngOnInit(): void {
    let url="https://exp.kkant.repl.co/products.json"
    this.http.get(url).subscribe(products=>{
      console.log(products['products'])

      let arr = products['products']
      for(let i=0;i<arr.length;i++)
        this.userService.products.push(new product(arr[i]['id'], arr[i]['title'], arr[i]['description'], arr[i]['availableSizes'], arr[i]['price'], arr[i]['currencyId'], arr[i]['currencyFormat'], arr[i]['isFreeShipping'], arr[i]['style']))
      this.maxLen = Math.ceil(this.userService.products.length/5)
      this.curProducts = this.userService.products.slice(0,5)
    })
  }

  pageChange(page: any){
    console.log(this.curProducts)
    if(page == '<')
      this.curPage = Math.max(1, this.curPage-1)
    else if(page == '>')
      this.curPage = Math.min(this.maxLen, this.curPage+1)
    else
      this.curPage = page

    this.curProducts = this.userService.products.slice((this.curPage-1)*5, this.curPage*5)
  }

  // addNote(){
  //   this.userService.notes.push({key: this.datepipe.transform((new Date), 'MM/dd/yyyy h:mm:ss:sss'),title: this.title, description: this.description})
  //   this.title=""
  //   this.description=""
  //   console.log(this.userService.notes)
  // }

  // autogrow(){
  //   let  textArea = document.getElementById("form1Example2")       
  //   textArea.style.overflow = 'hidden';
  //   textArea.style.height = '0px';
  //   textArea.style.height = textArea.scrollHeight + 'px';
  // }


}
