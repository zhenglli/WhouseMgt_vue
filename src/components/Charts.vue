<template>
  <div class="charts">
    <el-button type="primary" plain size="small" @click="sale('week','financeChart')">周销售额报表</el-button>
    <el-button type="primary" plain size="small" @click="sale('month','financeChart')">月销售额报表</el-button>
    <el-button type="primary" plain size="small" @click="sale('year','financeChart')">年销售额报表</el-button>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="financeChart"></div>
  </div>
</template>

<script>
  // import echarts from '../../public/js/echarts.min.js'
  export default {
    name: 'Charts', 
    mounted(){
      this.sale('week','financeChart');
    },
    methods:{
      sale(date,targetId){
        this.axios.get(`/finance/v1/${date}lySales`).then(result=>{
          let _text="";
          // console.log(result.data);
          if(date=="month"){_text="月"}
          else if(date=="week"){_text="周"}
          else if(date=="year"){_text="年"}
          else{_text=""}
          let sales=result.data.data.map(v=>v["total"]);
          let productNames=result.data.data.map(v=>v[`${date}(delivery_date)`]+_text);
          // console.log(sales);
          // console.log(productNames);
          // 基于准备好的dom，初始化echarts实例
          var myChart = this.$echarts.init(document.getElementById(targetId),null,{ renderer : 'svg' });
          // 指定图表的配置项和数据
          var option = {
            title: {
              text: `${_text}销报表`
            },
            tooltip: {},
            legend: {
              data:[`${_text}销售额`]
            },
            xAxis: {
              data: productNames
            },
            yAxis: {},
            series: [{
              name: `${_text}销售额`,
              type: 'bar',
              data: sales
            }]
          };
          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        })
      }
    }
  }
</script>
<style scoped>
  #financeChart{
    width: 100%;
    height:377px;
    padding:4% 0 0 4%;
    box-sizing: border-box;
  }
  .charts{
    width:36%;
    height:420px;
    background-color:#fff;
    padding-top:10px;
    margin-top:15px;
    box-sizing: border-box;
  }
</style>