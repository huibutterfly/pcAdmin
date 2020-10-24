<template>
  <div id="container">
    <div id="lineContainer">
      <div class="left">
        <div :style="{top: index * (50 + 20) + 'px'}" class="item leftItem" :id="'leftItem' + index" @click="setStartObj($event, index)" v-for="(item, index) in question" :key="index">{{item}}</div>
      </div>
      <div class="rigth">
        <div :style="{top: index * (50 + 20) + 'px'}" class="item rightItem" :id="'rightItem' + index" @click="setEndObj($event, index)" v-for="(item, index) in answer" :key="index">{{item}}</div>
      </div>
    </div>
    <div class="myCanvas">
      <canvas id="myCanvas" width="800" height="800" style="position: absolute;"></canvas>
    </div>
  </div>
</template>

<script>


export default {
  name: "Index",
  data() {
    return {
      ctx: null,
      question: [1,2,3,4,5,6,7],
      answer: [2,3,4,6,5,7,1],
      startObj: null,
      endObj: null,
      startIndex: 0,
      endIndex: 0,
      answerObj: {
        '1': null,
        '2': null,
        '3': null,
        '4': null,
        '5': null,
        '6': null,
        '7': null
      },
      answerArray: []
    };
  },
  mounted() {
    const myCanvas = document.getElementById("myCanvas")
    this.ctx = myCanvas.getContext("2d")
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
      console.log(e)
      this.endObj = e
      this.endIndex = index
      if(this.startObj) {
        this.answerObj[this.question[this.startIndex]] = this.setPoint(this.startObj, this.endObj)
      }
      this.answerArray = []
      this.question.forEach((element) => {
        if(this.answerObj[element]){
          this.answerArray.push(this.answerObj[element])
        }
      });
      console.log(this.answerArray)
      this.setLine()
    },
    setPoint(startObj, endObj){
      console.log(startObj, endObj)
      var y_start = 300;
      var x_start = (this.startIndex + 1) * (50 + 20) - 15
      var y_end = 300 + 200 
      var x_end = (this.endIndex + 1) * (50 + 20) - 15
      return [y_start, x_start, y_end, x_end]
    },
    setLine(){
      this.ctx.clearRect(0,0,800,800);
      this.ctx.beginPath();
      this.answerArray.forEach(element => {
        this.ctx.moveTo(element[0], element[1]);//起始位置
        this.ctx.lineTo(element[2], element[3]);//停止位置
      });
      this.ctx.stroke();
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
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    width: 800px;
    .item{
      position: absolute;
      width: 300px;
      height: 50px;
      line-height: 50px;
      margin-top: 30px;
      border: 1px solid rgb(223, 186, 186);
      background: #ffffff;
      box-sizing: border-box;
      z-index: 1000;
    }
    .leftItem{
      left: 0;
      // background-color: rgb(196, 227, 228);
    }
    .rightItem{
      right: 0;
      // background-color: rgb(187, 211, 168);
    }
  }
  .myCanvas{
    position: absolute;
    left: 0;
    top: 0;
    z-index: 800;
  }

</style>
