import { Pipe, PipeTransform } from '@angular/core';

// let timeRef = new Date();
// timeRef.getFullYear();    
// console.log(timeRef); 
// timeRef.setFullYear(2020);
// console.log(timeRef)

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  page:number = 1;
  fecha = new Date();

  transform(
    value: any, 
    arg: any): any 
    {
    const resultPosts = [];
    for(const client of value){
      if(client.date.indexOf(arg) > - 1 ){
         resultPosts.push(client);
      };
    };
    return resultPosts;
    
  }


}



//if(client.date.indexOf(arg) > -1){
