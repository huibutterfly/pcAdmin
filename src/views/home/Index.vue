<template>
  <div id="daskDrag">
    <div class="title">
      <h3>拖拽题</h3>
      <h4>下面是收台的顺序，请按顺序拖拽到正确的位置上</h4>
    </div>
    <draggable id="dinnerware"  v-model="dinnerware" @start="setStartELement" @end="setEndELement" draggable=".ware" :sort="false">
      <div class="ware" v-for="(item, index) in dinnerware" :key="index" :id="'ware_'+index" :style="{left: index * (80 + 20)  + 'px', top: '10px'}">
        <img :src="item.image" class="wareImage" :id="'wareImage_'+index">
      </div>
    </draggable>

    <div id="desk">
      <div :id="'dinner' + index" class="dinner" v-for="(item, index) in dinnerware" :key="index"
        :style="{left: index * (80 + 20)  + 'px', top: '130px'}">
        {{index + 1}}
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import { mixinDevice } from "@/utils/mixin";

export default {
  name: "Index",
  mixins: [mixinDevice],
  components: {
    draggable
  },
  data() {
    return {
      dinnerware: [
        { first: true, x: 0, y: 10, image:'/images/ware_01.png', left: '193px', pcTop: '0px', mobile: ''},
        { first: true, x: 0, y: 10, image:'/images/ware_02.jpg', left: '193px', pcTop: '0px', mobile: ''},
        { first: true, x: 0, y: 10, image:'/images/ware_03.png', left: '153px', pcTop: '0px', mobile: ''},
        { first: true, x: 0, y: 10, image:'/images/ware_04.png', left: '213px', pcTop: '0px', mobile: ''},
        { first: true, x: 0, y: 10, image:'/images/ware_05.png', left: '253px', pcTop: '0px', mobile: ''},
        { first: true, x: 0, y: 10, image:'/images/ware_06.png', left: '253px', pcTop: '0px', mobile: ''},
        { first: true, x: 0, y: 10, image:'/images/ware_07.png', left: '193px', pcTop: '0px', mobile: ''}
      ],
      currentX: 0,
      currentY: 0,
      currentWare: null,
    };
  },  
  created() {
  },
  methods: {
    setStartELement(e){
      this.currentWare = e.originalEvent
      const eIndex = this.currentWare.target.id.split("_")[1]
      this.currentX = this.currentWare.x
      this.currentY = this.currentWare.y
      if(this.dinnerware[eIndex].first){
        this.currentX = this.currentX - eIndex * (80 + 20)
      }
      this.currentWareIndex = eIndex
    },
    setEndELement(e){
      const currentWare = e.originalEvent
      const _x = currentWare.x ? currentWare.x : currentWare.changedTouches[0].pageX - this.currentX
      const _y = currentWare.y ? currentWare.y : currentWare.changedTouches[0].pageY - this.currentY
      const layerX = _x < 0 ? this.dinnerware[this.currentWareIndex].x - Math.abs(_x) : this.dinnerware[this.currentWareIndex].x + Math.abs(_x)
      const layerY = _y > 0 ? this.dinnerware[this.currentWareIndex].y + Math.abs(_y) : this.dinnerware[this.currentWareIndex].y - Math.abs(_y)
      this.dinnerware[this.currentWareIndex].x = layerX
      this.dinnerware[this.currentWareIndex].y = layerY
      const positionWare = document.getElementById("ware_" + this.currentWareIndex)
      positionWare.style.left = layerX + 'px'
      positionWare.style.top = layerY + 'px'
      this.dinnerware[ this.currentWareIndex].first = false
    }
  }
};
</script>
<style lang="less" scoped>
  #daskDrag{
    font-size: 15px;
    color: rgb(156, 44, 44);
    // display: flex;
    position: relative;
    margin: 10px;
    .title{
      margin-left: 10px;
    }
    #desk{
      width: 100%;
      // max-width: 800px;
      box-sizing: border-box;
      height: 300px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .dinner{
        text-align: center;
        max-width: 80px;
        width: 80px;
        background: #b1a2a2;
        height: 50px;
        line-height: 50px;
        margin: 60px 10px 20px 10px;
        // position: absolute;
      }
    }
    #dinnerware{
      width: 100%;
      max-width: 800px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      box-sizing: border-box;
      .ware{
        cursor: pointer;
        z-index: 1000;
        margin: 60px 10px 20px 10px;
        // position: absolute;
        z-index: 1000
      }
      .wareImage{
        max-width: 80px;
      }
    }
  }

  @media screen and (max-width: 991px){
    #daskDrag{
      display: inherit;
    }
  }
  @media only screen and (min-width: 1124px){
    #dinnerware{
      margin-bottom: 88px;
    }
  }
</style>
