<template>
  <div id="daskDrag">
    <div id="desk">
      <div class="center_line">
        <div class="text">中轴线</div>
      </div>
      <div class="dinner" v-for="(item, index) in dinnerware" :key="index" :style="{left: item.left, top: item.top}"></div>
    </div>
     <draggable id="dinnerware"  v-model="dinnerware" @start="setStartELement" @end="setEndELement" draggable=".ware" :sort="false">
      <div class="ware" v-for="(item, index) in dinnerware" :key="index" :id="'ware_'+index" :style="{width: item.width, height: item.height, borderRadius: item.width}">
        <!-- <img style="width: 30px" :style="{width: item.width, height: item.height}" id="img" src="https://lximg.huaguosun.com/1603356358kjsgc16gm7r.jpg"> -->
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: "Index",
  components: {
    draggable
  },
  data() {
    return {
      dinnerware: [
        { x: 0, y: 0, left: '193px', top: '60px', image: '', width: '70px', height: '70px'},
        { x: 0, y: 0, left: '193px', top: '120px', image: '', width: '80px', height: '80px'},
        { x: 0, y: 0, left: '153px', top: '160px', image: '', width: '100px', height: '100px'},
        { x: 0, y: 0, left: '213px', top: '160px', image: '', width: '60px', height: '60px'},
        { x: 0, y: 0, left: '253px', top: '160px', image: '', width: '50px', height: '50px'},
        { x: 0, y: 0, left: '193px', top: '230px', image: '', width: '70px', height: '70px'}
      ],
      currentX: 0,
      currentY: 0,
      currentWare: null
    };
  },
  created() {
    // setTimeout(() => {
    //   const img1 = document.getElementById('img1')
    //   var src1 = img1.getAttribute('src');
    //   img1.setAttribute('src','');
    //   img1.onload = function(){
    //     alert(1);
    //   };
    //   img1.setAttribute('src', src1);
    //   const img2 = document.getElementById('img2')
    //   var src2 = img2.getAttribute('src');
    //   img2.setAttribute('src','');
    //   img2.onload = function(){
    //     alert(2);
    //   };
    //   img2.setAttribute('src', src2);
    //   }, 50)
    
  },
  methods: {
    setStartELement(e){
      const currentWare = e.originalEvent
      this.currentWare = e.originalEvent
      const eIndex = currentWare.target.id.split("_")[1]
      this.currentX = currentWare.x
      this.currentY = currentWare.y
      this.currentWareIndex = eIndex
    },
    setEndELement(e){
      const currentWare = e.originalEvent
      console.log(currentWare)
      var div = document.getElementById("dinnerware");
      var x=event.clientX;
      var y=event.clientY;
      var divx1 = div.offsetLeft;
      var divy1 = div.offsetTop;
      var divx2 = div.offsetLeft + div.offsetWidth;
      var divy2 = div.offsetTop + div.offsetHeight;
      if(!(x < divx1 || x > divx2 || y < divy1 || y > divy2)){
        console.log('111111111111111')
        console.log(currentWare.target.left)
        this.dinnerware[this.currentWareIndex].x = 0
        this.dinnerware[this.currentWareIndex].y = 0
        this.currentWare.target.style.left = 0
        this.currentWare.target.style.top = 0
        console.log(currentWare.target.left)
        return
      }
      
      // const eWidth = this.dinnerware[eIndex].width.split("px")[0]
      // const eHeight = this.dinnerware[eIndex].height.split("px")[0]
      // const layerX = currentWare.x - this.currentX
      // const layerY = currentWare.y - this.currentY
      const _x = currentWare.x - this.currentX
      const _y = currentWare.y - this.currentY
      let layerX = _x < 0 ? this.dinnerware[this.currentWareIndex].x - Math.abs(currentWare.x - this.currentX) : this.dinnerware[this.currentWareIndex].x + Math.abs(currentWare.x - this.currentX)
      let layerY = _y > 0 ? this.dinnerware[this.currentWareIndex].y + Math.abs(currentWare.y - this.currentY) : this.dinnerware[this.currentWareIndex].y - Math.abs(currentWare.y - this.currentY)
      this.dinnerware[this.currentWareIndex].x = layerX
      this.dinnerware[this.currentWareIndex].y = layerY
      
      // currentWare.target.style.transform = `translate(${layerX}px, ${layerY}px)`

      currentWare.target.style.position = 'relative'
      currentWare.target.style.left = layerX + 'px'
      currentWare.target.style.top = layerY + 'px'
    }
  }
};
</script>
<style lang="less" scoped>
  #daskDrag{
    font-size: 15px;
    color: rgb(156, 44, 44);
    display: flex;
    position: relative;
    #desk{
      width: 401px;
      height: 300px;
      background-color: rgb(247, 241, 234);
      position: relative;
      box-sizing: border-box;
      .dinner{
        position: absolute;
        width: 15px;
        height: 15px;
        border-radius: 15px;
        background-color: pink;
        box-sizing: border-box;
      }
      .center_line{
        position: absolute;
        left: 200px;
        top: 0%;
        bottom: 0;
        box-sizing: border-box;
        width: 1px;
        background: goldenrod;
        .text{
          width: 60px;
          padding-left: 10px;
        }
      }
    }
    #dinnerware{
      margin-left: 15px;
      width: 200px;
      // background: rgb(196, 232, 233);
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .ware{
        background-color: rgb(206, 205, 252);
        cursor: pointer;
      }
      #ware_0 {
        // transform: translate(-256px, 9px);
      }
    }
  }
</style>
