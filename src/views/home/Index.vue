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
    };
  },
  created() {
    // setTimeout(() => {
    //   console.log(document.getElementById('img').onload)
    //   const img = document.getElementById('img')
    //   var src = img.getAttribute('src');
    //   img.setAttribute('src','');
    //   img.onload = function(){
    //     alert(1);
    //   };
    //   img.setAttribute('src',src);
    //   // xiu.onload = xiu.onreadystatechange = function(){
    //   //   console.log('1111111111')
    //   // }
    // }, 50)
    
  },
  methods: {
    setStartELement(e){
      const currentWare = e.originalEvent
      const eIndex = currentWare.target.id.split("_")[1]
      // const eIndex = e.originalEvent.target.id.split("_")[1]
      // const layerX = this.dinnerware[eIndex].x
      // const layerY = this.dinnerware[eIndex].y
      // console.log(currentWare)
      // currentWare.target.draggable = true
      // if(layerX != 0 && layerY != 0){
      //   currentWare.target.style.transform = `translate(${layerX}px, ${layerY}px)`
      // }
      this.currentX = currentWare.x
      this.currentY = currentWare.y
      this.currentWareIndex = eIndex
    },
    setEndELement(e){
      const currentWare = e.originalEvent
      console.log(currentWare)
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
