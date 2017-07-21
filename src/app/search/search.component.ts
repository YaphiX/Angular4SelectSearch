import { Component,HostListener,Input,OnChanges,SimpleChanges,ViewChild } from '@angular/core';


export class Items {
    value:string;
}
export class Itemscpy {
    value:string;
}

const ITEMS: Items[] = [
    {value: "周杰伦"},
    {value: '王力宏'},
    {value: '薛之谦'},
    {value: '许嵩'},
    {value: '周杰'},
    {value: '邓紫棋'},
    {value: '林俊杰'}
 ];

const ITEMSCPY: Items[] = []

@Component({
    selector: 'on-changes',
    template:''
})

export class OnChangesComponent implements OnChanges {
    @Input() query: string;
    items = ITEMS;
    itemscpy = ITEMSCPY;

    ngOnChanges(changes: SimpleChanges) {
      /*

          判断input是否为第一次onchange,实际操作中发现,onchange必会运行一次,而第一次的运行时，
          changes.query.firstChange为true,所以根据该值来初始化,将Items里的值存到Itemscpy中

      */
      if(changes.query.firstChange) {

        let items = this.items
        let itemscpy = this.itemscpy

        for(let i=0;i<items.length;i++) { 
            itemscpy[i] = items[i]
        }

        for(let query in changes) {
          let chng = changes[query]; //拿到一个对象包括三个值，具体可以打印出来，目的是获取当前输入的值
          let cur  = JSON.stringify(chng.currentValue) //拿到当前输入的值
          if(cur != undefined){     //因为onchange函数必会运行一次，第一次cur是undefine为了避免浏览器报大量错误，此处做判断
              cur = cur.replace(/\"/g, "")  //此处用正则表达式将cur的双引号去掉，和itemscpy[i]中的值做判断
          }
          for(let i=0;i<itemscpy.length;i++) {
            //此处之所以用itemscpy，items是一个动态变化的变量，用于我们页面的显示作用，而itemscpy是一个不变量代表了items的最初始的值
            if(itemscpy[i].value.indexOf(cur) != -1){ //此处是字符串包含的意思
              items.push(itemscpy[i])
            }
            if(cur === '') { //当用户将input的值清空的时候，重新恢复所有选项
               let itemscpy = this.itemscpy
               let items = this.items
               for(let i=0;i<itemscpy.length;i++) {
                   items[i] = itemscpy[i]
               }
            }
          }
        }

      } else {
        let items = this.items
        let itemscpy = this.itemscpy
        items.splice(0,items.length)

        for(let query in changes) {
          let chng = changes[query];
          let cur  = JSON.stringify(chng.currentValue)
          if(cur != undefined){
             cur = cur.replace(/\"/g, "")
          }
          for(let i=0;i<itemscpy.length;i++) {
            if(itemscpy[i].value.indexOf(cur) != -1){
              items.push(itemscpy[i])
            } 
            if(cur === '') {
               let itemscpy = this.itemscpy
               let items = this.items
               items.splice(0,items.length)
               for(let i=0;i<itemscpy.length;i++) {
                   items[i] = itemscpy[i]
               }
            }
          }
      }
  }
}
}

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})

export class SearchComponent {
    selectedValue: string;
    query:string;

    @ViewChild(OnChangesComponent) childView: OnChangesComponent;
    items = ITEMS;
    itemscpy = ITEMSCPY;


  @HostListener('mouseleave')
    //当鼠标离开input,Items先全部清空,然后根据之前存的Itemscpy备份变成初始状态
      onMouseLeave() {
        let itemscpy = this.itemscpy
        let items = this.items
        items.splice(0,items.length)
        for(let i=0;i<itemscpy.length;i++) {
        items[i] = itemscpy[i]
      }
  }

}