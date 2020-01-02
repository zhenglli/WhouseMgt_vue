<template>
  <div>
    <div id="container" :data="data"></div>
    <!-- <div id="panel"></div> -->
  </div>
</template>

<script>
import remoteLoad from '@/utils/remoteLoad.js'
import citysLatLog from '@/assets/citysLatLog.json'
export default {
  props:{
    data:{}
  },
  data(){
    return{
      path:[],
    }
  },
  methods:{
    initMap(){
      var map =new AMap.Map("container", {});
      var truckOptions = {
        map: map,
        policy:0,
        size:1,
        city:'beijing',
        // panel:'panel'
      };
      var driving =new AMap.TruckDriving(truckOptions);
      driving.search(this.path);
      // driving.search(this.path, function(status,result) {
      //     // result即是对应的货车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
      //     if (status === 'complete') {
      //       log.success('绘制货车路线完成')
      //     } else {
      //       log.error('获取货车规划数据失败：' + result)
      //     }
      // });
    }
  },
  watch:{
    data(){
            //提取途径的所有城市
      let Traces=this.data.Traces.map(obj=>{
        let reg=/【[\u4e00-\u9fa5\w]+】/;
        let arr=reg.exec(obj.AcceptStation);
        return arr[0].slice(1,-2);
      })
      //去除重复的城市名
      let PassingCity=[];
      for (var i = 0; i < Traces.length; i++) {
        if (PassingCity.indexOf(Traces[i]) === -1) {
          PassingCity.push(Traces[i]);
        }
      }
      // console.log(PassingCity);
      // 查找经过城市的经纬度
      PassingCity.map(val=>{
        //判断是否为省名或直辖市名
        citysLatLog.map(obj=>{
          if(obj["name"]==val){
            //如果是直接返回true，保留该对象
            this.path.push({lnglat:[ obj["log"],obj["lat"] ]});
            return obj;
          }else{        //否则判断是否为其下属的城市名
            //创建变量保存城市名所在对象数组
            // 如果是就保存进 findCity变量
            obj["children"].map($obj=>{
              if($obj["name"]==val){
                this.path.push({lnglat:[ $obj["log"],$obj["lat"] ]});
                return $obj;
              }else{
                return 0;
              }
            });
          }
        })
      })
      this.initMap()
    }
  },
  async created () {

    // 已载入高德地图API，则直接初始化地图
    if (window.AMap && window.AMapUI) {
      this.initMap()
    // 未载入高德地图API，则先载入API再初始化
    } else {
      await remoteLoad(`http://webapi.amap.com/maps?v=1.4.15&key=f229fb64473e50d4f71332140e7b7217&plugin=AMap.TruckDriving`)
      await remoteLoad('https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js')
      this.initMap()
    }
  }
}
</script>

<style  scoped>
#container {
  width: 100%;
  height: 100%;
  /* height: 1000px; */
}
/* #panel {
    position: fixed;
    background-color: white;
    max-height: 90%;
    overflow-y: auto;
    top: 10px;
    right: 10px;
    width: 280px;
}
#panel .amap-lib-driving {
    border-radius: 4px;
    overflow: hidden;
} */
</style>