<template>
  <div id="daskDrag">
    <div id="desk">
      <div class="center_line">
        <div class="text">中轴线</div>
      </div>
      <div class="dinner" v-for="(item, index) in dinnerware" :key="index" :style="{left: item.left, top: item.top}">
        <div class='line'  :style="{width: item.lineWidth+'px'}"></div>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item3 in item.options"
            :key="item3.value"
            :label="item3.label"
            :value="item3.value">
          </el-option>
        </el-select>
 
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
      dinnerware: [
        { x: 0, y: 0, left: '193px', top: '60px', image: '', width: '70px', height: '70px',size:[5,3], lineWidth:'40',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],},
        { x: 0, y: 0, left: '193px', top: '120px', image: '', width: '80px', height: '80px',size:[1,1],lineWidth:'43',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],},
        { x: 0, y: 0, left: '153px', top: '160px', image: '', width: '100px', height: '100px',size:[1,1],lineWidth:'43',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],},
        { x: 0, y: 0, left: '213px', top: '160px', image: '', width: '60px', height: '60px',size:[1,1],lineWidth:'43',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],},
        { x: 0, y: 0, left: '253px', top: '160px', image: '', width: '50px', height: '50px',size:[1,2],lineWidth:'43',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],},
        { x: 0, y: 0, left: '193px', top: '230px', image: '', width: '70px', height: '70px',size:['1/3','2'],lineWidth:'43',
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],}
      ],
      value: '',
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
      // console.log(currentWare)
      this.currentWare = e.originalEvent
      const eIndex = currentWare.target.id.split("_")[1]
      this.currentX = currentWare.x
      this.currentY = currentWare.y
      this.currentWareIndex = eIndex
    },
    setEndELement(e){
      const currentWare = e.originalEvent
      console.log(currentWare)
      console.log(e)


      var div = document.getElementById("dinnerware");
      var x = event.clientX;
      var y = event.clientY;
      var divx1 = div.offsetLeft;
      var divy1 = div.offsetTop;
      var divx2 = div.offsetLeft + div.offsetWidth;
      var divy2 = div.offsetTop + div.offsetHeight;

      let _x = 0
      let _y = 0
      let layerX = 0
      let layerY = 0
      if(this.isDsktop()){
        console.log(div)
        // 如果放回到选取区内 这自动规整
        if(!(x < divx1 || x > divx2 || y < divy1 || y > divy2)){
          this.dinnerware[this.currentWareIndex].x = 0
          this.dinnerware[this.currentWareIndex].y = 0
          this.currentWare.target.style.left = 0
          this.currentWare.target.style.top = 0
          return
        }
        
        // const eWidth = this.dinnerware[eIndex].width.split("px")[0]
        // const eHeight = this.dinnerware[eIndex].height.split("px")[0]
        // const layerX = currentWare.x - this.currentX
        // const layerY = currentWare.y - this.currentY
        _x = currentWare.x - this.currentX
        _y = currentWare.y - this.currentY
        layerX = _x < 0 ? this.dinnerware[this.currentWareIndex].x - Math.abs(_x) : this.dinnerware[this.currentWareIndex].x + Math.abs(_x)
        layerY = _y > 0 ? this.dinnerware[this.currentWareIndex].y + Math.abs(_y) : this.dinnerware[this.currentWareIndex].y - Math.abs(_y)
        this.dinnerware[this.currentWareIndex].x = layerX
        this.dinnerware[this.currentWareIndex].y = layerY
        console.log(layerX)
        console.log(layerY)
        // currentWare.target.style.transform = `translate(${layerX}px, ${layerY}px)`
        // const setWare = document.getElementById('ware' + this.currentWareIndex)
        currentWare.target.style.position = 'relative'
        currentWare.target.style.left = layerX + 'px'
        currentWare.target.style.top = layerY + 'px'
      }else if(this.isMobile()){
        console.log(div)
        // 如果放回到选取区内 这自动规整
        if(!(x < divx1 || x > divx2 || y < divy1 || y > divy2)){
          // this.dinnerware[this.currentWareIndex].x = 0
          // this.dinnerware[this.currentWareIndex].y = 0
          // this.currentWare.target.style.left = 0
          // this.currentWare.target.style.top = 0
          // return
        }
        console.log(currentWare.changedTouches[0].pageX)
        _x = currentWare.changedTouches[0].pageX - this.currentX
        _y = currentWare.changedTouches[0].pageY - this.currentY
        console.log(_x)
        layerX = _x < 0 ? this.dinnerware[this.currentWareIndex].x - Math.abs(_x) : this.dinnerware[this.currentWareIndex].x + Math.abs(_x)
        layerY = _y > 0 ? this.dinnerware[this.currentWareIndex].y + Math.abs(_y) : this.dinnerware[this.currentWareIndex].y - Math.abs(_y)
        this.dinnerware[this.currentWareIndex].x = layerX
        this.dinnerware[this.currentWareIndex].y = layerY
        // currentWare.target.style.transform = `translate(${layerX}px, ${layerY}px)`
        // const setWare = document.getElementById('ware' + this.currentWareIndex)
        currentWare.target.style.position = 'relative'
        currentWare.target.style.left = layerX + 'px'
        currentWare.target.style.top = layerY + 'px'
      }else if(this.isTablet()){
         console.log(currentWare.changedTouches[0].pageX)
        _x = currentWare.changedTouches[0].pageX - this.currentX
        _y = currentWare.changedTouches[0].pageY - this.currentY
        console.log(_x)
        layerX = _x < 0 ? this.dinnerware[this.currentWareIndex].x - Math.abs(_x) : this.dinnerware[this.currentWareIndex].x + Math.abs(_x)
        layerY = _y > 0 ? this.dinnerware[this.currentWareIndex].y + Math.abs(_y) : this.dinnerware[this.currentWareIndex].y - Math.abs(_y)
        this.dinnerware[this.currentWareIndex].x = layerX
        this.dinnerware[this.currentWareIndex].y = layerY
        // currentWare.target.style.transform = `translate(${layerX}px, ${layerY}px)`
        // const setWare = document.getElementById('ware' + this.currentWareIndex)
        currentWare.target.style.position = 'relative'
        currentWare.target.style.left = layerX + 'px'
        currentWare.target.style.top = layerY + 'px'
      }
      
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

  @media screen and (max-width: 991px){
    #daskDrag{
      display: inherit;
    }
  }
</style>
