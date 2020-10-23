<template>
  <div id="container">
    <div id="lineContainer">
      <div class="left">
        <div class="item leftItem" :id="'leftItem' + index" @click="setStartObj($event, index)" v-for="(item, index) in question" :key="index">{{item}}</div>
      </div>
      <div class="rigth">
        <div class="item rightItem" :id="'rightItem' + index" @click="setEndObj($event, index)" v-for="(item, index) in answer" :key="index">{{item}}</div>
      </div>
    </div>
    <div id="line">
      <div v-for="(item, index) in answerHtml" :key="index">
        <div v-html="item">{{item}}</div>

      </div>
    </div>
  </div>
</template>

<script>
import { mixinDevice } from "@/utils/mixin";

export default {
  name: "Index",
  mixins: [mixinDevice],
  data() {
    return {
      question: [1,2,3,4,5,6,7],
      answer: [2,3,4,6,5,7,1],
      startObj: null,
      endObj: null,
      startIndex: 0,
      endIndex: 0,
      answerHtmlObj: {
        '1': null,
        '2': null,
        '3': null,
        '4': null,
        '5': null,
        '6': null,
        '7': null
      },
      answerHtml: [],
      xPx: 80,
      xPy: 300
    };
  },  
  created() {
   
  },
  methods: {
    setStartObj(e, index) {
      console.log(e)
      this.startObj = e
      this.startIndex = index
    },
    setEndObj(e, index){
      this.endObj = e
      this.endIndex = index
      if(this.startObj) {
        this.answerHtmlObj[this.question[this.startIndex]] = this.drawLine(this.startObj, this.endObj)
      }
      this.answerHtml = []
      this.question.forEach((element) => {
        if(this.answerHtmlObj[element]){
          this.answerHtml.push(this.answerHtmlObj[element])
        }
      });
      console.log(this.answerHtml)
    },
    drawLine(startObj, endObj) {
        console.log(startObj)
        console.log(startObj)
        var html = "";
        var y_start = startObj.offSetTop;
        var x_start =  startObj.offSetLeft;
        var y_end = endObj.offSetTop
        var x_end = endObj.offSetLeft
        var deg = 0; 
        var t = null
        console.log(y_start)
        if (y_start == y_end) // 画横线
        {
            if (x_start > x_end) {
                t = x_start;
                x_start = x_end;
                x_end = t
                deg = 180;
            }
            length = Math.abs(x_end - x_start);    
        } else if (x_start == x_end) // 画竖线
        {
            deg = 90;
            if (y_start > y_end) {
                t = y_start;
                y_start = y_end;
                y_end = t
                deg = 270;
            }
            length = Math.abs(y_end - y_start);
        } else {// 画线旋转角度
            var lx = x_end - x_start + 20;
            var ly = y_end - y_start + 20;
            var length = Math.sqrt(lx * lx + ly * ly); //计算连线长度
            var c = 360 * Math.atan2(ly, lx) / (2 * Math.PI); //弧度值转换为角度值
            c = c <= -90 ? (360 + c) : c;  //负角转换为正角
            deg = c;
        }
        console.log(deg)
        console.log(length)
        html = "<div class='rotate' style='height:2px;position:absolute;background-color:rgb(187, 211, 168);top:" +(y_start - 50)+ "px;left:" +x_start
                +"px;width:"+length+"px;transform:rotate("+deg+"deg)'>" 
                +
                        "<i class='arrow-img'></i>"+
                        "<i class='con-img'></i></div>";
        return html;
    }
  }
    
};
</script>
<style lang="less" scoped>
  .rotate{
    height: 2px;
    box-sizing: border-box;
    background-color: rgb(187, 211, 168);
  }
  #lineContainer{
    display: flex;
    justify-content: space-between;
    width: 800px;
    .item{
      width: 300px;
      height: 50px;
      line-height: 50px;
      margin-top: 30px;
      border: 1px solid rgb(223, 186, 186)
    }
    .leftItem{
      // background-color: rgb(196, 227, 228);
    }
    .rightItem{
      // background-color: rgb(187, 211, 168);
    }
  }
</style>
