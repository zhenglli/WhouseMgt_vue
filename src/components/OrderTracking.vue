<template>
  <div class="wrap" :style="{height:canHeight}">
    <div class="queryInput">
      <div class="d-tran">
        运输公司：
        <el-autocomplete
          class="inline-input"
          v-model="shipper"
          :fetch-suggestions="querySearch"
          placeholder="请选择运输公司"
          @select="handleSelect"
        ></el-autocomplete>
      </div>
      <div class="d-order">
        订单编号：
        <el-input
          placeholder="请输入快递单号"
          v-model="LogisticCode"
          clearable>
        </el-input>
      </div>
      <el-button @click="tracking">查询</el-button>
    </div>
    <div class="detail" :style="{height:mapHeight}">
      <path-map :data="data" class="pathMap"></path-map>
      <el-timeline>
        <el-timeline-item
          v-for="(good, index) in goodsinfo"
          :key="index"
          :color="index==goodsinfo.length-1?'#fe7328':''"
          :timestamp="good.AcceptTime">
          {{good.AcceptStation}}
        </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>
import expressCode from '@/assets/expressCode.json'
import PathMap from './PathMap.vue'
export default {
  components:{
    PathMap
  },
  data(){
    return{
      mapHeight:0,
      canHeight:0,
      restaurants: [],
      shipper: '',
      goodsinfo:'',
      ShipperCode:'',
      LogisticCode:'',
      data:''
    }
  },
  methods:{
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll() {
      return expressCode;
    },
    handleSelect(item){
      this.ShipperCode = item.shipNum;
    },
    tracking(){
      if(this.ShipperCode==""){
        this.ShipperCode = this.getNum(this.shipper);
      }
      this.axios.get("/logistics/v1/immediateQuery",{
        params:{
          ShipperCode:this.ShipperCode,
          LogisticCode:this.LogisticCode
        }
      }).then(result=>{
        this.data = result.data.data;
        this.goodsinfo=result.data.data.Traces;
      })
    },
    getNum(val){
      var ship;
      var results = this.loadAll();
      for(var i=0;i<results.length;i++){
        if(results[i].value==val){
          ship = results[i].shipNum;
          break;
        }
      } 
      return ship;
    },
  },
  mounted(){
    this.restaurants = this.loadAll();
    this.canHeight = (document.body.clientHeight-117)+"px";
    this.mapHeight = (document.body.clientHeight-187)+"px";
  }
}
</script>

<style scoped>
  .queryInput {
    width:70%;
    margin-left:15%;
    display:flex;
    align-items: center;
    justify-content: space-around;
    padding:15px 0;
    box-sizing: border-box;
  }
  .d-tran,.d-order {
    width:40%;
  }
  .el-autocomplete,.el-input--suffix {
    width:70%;
  }
  .detail {
    display: flex;
    justify-content: space-around;
    padding-top: 1%;
    box-sizing: border-box;
  }
  .pathMap {
    width:55%;
  }
  .el-timeline {
    text-align: left;
    width:39%;
    overflow:auto;
  }
</style>