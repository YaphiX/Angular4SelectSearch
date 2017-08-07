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
          SimpleChange对象中的changes.query.firstChange为true,所以根据该值来初始化,将Items里的值存到Itemscpy中

      */
      if(changes.query.firstChange) {
        let items = this.items
        let itemscpy = this.itemscpy
        for(let i=0;i<items.length;i++) { 
            itemscpy[i] = items[i]
        }
      } 
      /*
          当输入的时候已经是算第二次change了，搜索代码如下
      */
      else {
        let items = this.items
        let itemscpy = this.itemscpy
        items.splice(0,items.length) // 清空items，页面效果是当我们输入的时候option消失，根据下面的for循环生成一个新的items然后在显示到页面上
        for(let query in changes) {
          console.log(changes[query]);
          let chng = changes[query]; // SimpleChange中拿到当前输入的值
          let cur  = JSON.stringify(chng.currentValue)
          if(cur != undefined){ 
             cur = cur.replace(/\"/g, "")
          }
          for(let i=0;i<itemscpy.length;i++) {
            if(itemscpy[i].value.indexOf(cur) != -1){ // itemscpy中包含当前输入value的option
              items.push(itemscpy[i])
            } 
            if(cur === '') {  // 输入条件为空的情况
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