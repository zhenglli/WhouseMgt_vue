
    
    <!-- <div class="male1"> 
      <el-breadcrumb separator="|" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">销售发货</el-breadcrumb-item>
        <el-breadcrumb-item>采购进货</el-breadcrumb-item>
        <el-breadcrumb-item>售后处理</el-breadcrumb-item>
      </el-breadcrumb>
     
    </div>
      <div class="male2">
      <el-breadcrumb separator=">" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">订单审核</el-breadcrumb-item>
        <el-breadcrumb-item>配快递</el-breadcrumb-item>
        <el-breadcrumb-item>拣货</el-breadcrumb-item>
        <el-breadcrumb-item>验货</el-breadcrumb-item>
        <el-breadcrumb-item>称重</el-breadcrumb-item>
        <el-breadcrumb-item>发货</el-breadcrumb-item>
      </el-breadcrumb>
      </div>

<script>
  import citysJson from "../assets/citys.json"
  import OrderSubmission from "../components/OrderSubmission"
  import OrderSearch from "../components/OrderSearch"

export default {
  
}
</script>

<style>
  /* 顶部面包屑 */
  .male1{
    position: absolute;
    top: 100px;
    left: 600px;
  }
  .el-breadcrumb.bread{
    font-size: 20px;
    line-height: 1;
}
  /* 第二行面包屑 */
  .male2{
    position: absolute;
    top: 200px;
    left: 525px;
    border: 1px solid #ccc;
    padding: 10px;
    background: #ccc;
    
  }
</style> -->
<template>
  <div  class="ind">
    <!-- 侧边栏 子组件 -->
    <main-aside></main-aside>
    <!-- 右侧 header部分 子组件 -->
    <main-header></main-header>
    <!-- 右侧主体部分 -->
    <div class="main">
    <!-- 外层导航 -->
    <el-tabs  class="compon" type="border-card"> 
      <el-tab-pane label="销售发货">
        <br>
        <!-- 内层导航 -->
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="订单审核" name="first">
            <div>
              主要模块：
              <p>
                “订单”菜单→【订单】，支持拆分、合并、配快递、送赠品、做标记、识刷单、转异常等所有审单操作，既可手动、逐单进行，也可智能、自动、批量进行。
              </p>
              相关模块：
              <p>
                部分智能化批量操作的规则设置，请参见“设置菜单”→【业务流程设置】、【订单智能审核规则】、【赠品规则设置】、【特殊订单识别】、【订单自动筛选设置】等。
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="配快递" name="second">
            <div>
              主要模块：
              <p>
                “订单”菜单→【订单】，可在点击“审核”命令按钮时由系统按预设规则自动给与指派，也可点击“按快递”命令按钮手动指派。
              </p>
              相关模块：
              <p>
                部分智能化批量操作的规则设置，请参见“设置”菜单→【物流（快递）公司及打印模块】、【运营计算配置】等。
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="拣货" name="third">
            <div>
              主要模块：
              <p>
                “订单”菜单→【订单拣货】，该模块可自动获取电子面单号，并有按商品、按单件或多件、按重量、按店铺或分销商等多种前置打单模式可供选择，以帮助提升拣货效率。企业版客户的后置打单模式，请先于“库存”菜单→【件货批次管理】生成此次任务。
              </p>
              相关模块：
              <p>
                作为拣货指导的纸质单据会有对应不同表现形式，如（汇总）拣货单、销售单、发货单、出库单等，请参见“设置菜单”→【其他打印模板设置】。
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="验货" name="fourth">
            <div>
              主要模块：
              <p>
                “订单”菜单→【检验出库】或【发货+】，该模块主要用于检验订单号、快递单号、所包含货品的应拣品种数量的对比，以避免错发、漏发、多发等情况。
              </p>
              相关模块：
              <p>
                部分流程设定，请参见“设置”菜单→【业务流程设置】
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="称重" name="fifth">
            <div>
              主要模块：
              <p>
                “订单”菜单→【称重】或【发货+】，该模块是可选项，主要用于已通过验货的打包后的称重，并有6种流程、逐一或批量操作可供选择，以便于跟快递公司对账。
              </p>
              相关模块：
              <p>
                部分流程设定，请参见→【业务流程设置】。
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="发货" name="sixth">
            <div>
              主要模块：
              <p>
                “订单”菜单→【发货】或【发货+】，该模块是可选项，主要用于确认某个订单已发货出库，并有3种方式、逐一或批量操作可供选择。
              </p>
              相关模块：
              <p>
                部分流程设置，请参见“设置”菜单→【业务流程设置】；同步发货信息到线上，请参见“设置”菜单→【店铺设置】。
              </p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
      <br>
      <el-tab-pane label="采购进货">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
         <el-tab-pane label="采购计划" name="first">
           <div>
             主要模块：
              <p>
                “采购”菜单→【计划采购建议】或【已采购建议】、【已售采购建议（快销模式）】等，主要由于系统根据事先设定的具体规则或参数来自动生成采购计划（建议）。
              </p>
              相关模块：
              <p>
                需事先创建并维护相应的供应商，请参见“设置”菜单→【供应商信息】。
              </p>
            </div>
         </el-tab-pane>
           <el-tab-pane label="采购单审核" name="second">
             <div>
               主要模块：
              <p>
                “采购”菜单→【采购单管理】，该模块是整个ERP系统的采购单处理（审核生效、变更修改、作废等）的核心环节，并支持手工创建或导入采购单。
              </p>
              相关模块：
              <p>
                无
              </p>
            </div>
           </el-tab-pane>
           <el-tab-pane label="进货入库" name="third">
             <div>
               主要模块：
              <p>
                “库存”菜单→【采购入库】，该模块是对之前已经生效的采购单实际到货进行确认入库，支持一次性或分批到货，并支持无采购入库（事先并未创建采购单据）。
                企业版客户端因为开通了库存精细化管理，请先于“库存”菜单→【采购进仓+】或PDA端的【进仓】进行作业，系统会在【采购入库】自动生成响应单据记录。
              </p>
              相关模块：
              <p>
                是否需要把采购在途数上传到线上以供售卖，请于“设置”菜单→【业务流程设置】里设定。
              </p>
            </div>
           </el-tab-pane>
           <el-tab-pane label="进仓上架" name="fourth">
             <div>
               主要模块：
              <p>
                “库存”菜单→【库存调拨】，已入库的货品需经过质检、更换包装等，达到相关正品标准了才从进货仓移到主仓供销售。
                企业版客户因为开通了库存精细化管理，必须要用PDA端的【进仓上架】进行作业。
              </p>
              相关模块：
              <p>
                如果正品控不这么严，流程也不需要这么多环节，可在前一阶段的“库存”菜单→【采购入库】响应单据把默认的进货仓直接改为主仓；或者，于“设置”菜单→【仓库资料设定】不在启用进货仓。
              </p>
            </div>
           </el-tab-pane>
          </el-tabs>
      </el-tab-pane>
      <el-tab-pane label="售后处理">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
          <el-tab-pane label="申请售后" name="first">
             <p>
              买家在线上（如淘宝、天猫、京东、唯品会、拼多多等电商平台）发起售后申请，可以仅是退款、退货退款、换货、补发、投诉中的任意一类型，并提供相关凭证。
            </p>
          </el-tab-pane>
          <el-tab-pane label="生成售后单" name="second">
            <div>
              主要模块：
              <p>
                “订单”菜单→【售后（退货退款）】，如果是淘宝天猫平台的仅退款、退货申请，系统会自动创建相应的售后单，别的类型或其他平台，均需手动创建相应的售后单。
              </p>
              相关模块：
              <p>
                部分智能化批量操作的规则设置，请参见“设置”菜单→【业务流程设置】；需要启用淘宝天猫平台的自动创建售后单功能，请于“设置”菜单→【店铺设置】里设定。
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="审核" name="third">
            <div>
              主要模块：
              <p>
                “订单”菜单→【售后（退货退款）】，该模块是整个ERP系统的售后单处理（同意、拒绝、修改、作废等）的核心环节，并支持手工创建售后单
              </p>
              相关模块：
              <p>
                是否需要比较原订单支付金额和申请退款金额以审查。请于“设置”菜单→【业务流程设置】里设定。
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="退货入库" name="fourth">
            <div>
              主要模块：
              <p>
                “订单”菜单→【售后（退货退款）】或【售后扫描登记】、【售后扫描登记v2】等，像退货退款、换货的售后类型，是需要在收到买家寄回商品并验收入库后，才进行下一步处理
              </p>
              相关模块：
              <p>
                部分智能化批量操作的规则设置，请参见“设置”菜单→【业务流程设置】。
              </p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="消退上架" name="fifth">
            <div>
              主要模块：
              <p>
                “库存”菜单→【库存调拨】，已入库的货品需先经过质检、更换包装等，达到相关正品标准才从销退仓移到主仓供销售。
                企业版客户因为开通了库存精细化管理，必须要用PDA【销退上架】进行作业。
              </p>
              相关模块：
              <p>
                如果品控不这么严，流程也不需要这么多环节，可在前一阶段的“订单”菜单→【售后（退货退款）】相应的单据把默认的销退仓直接改为主仓；或者，于“设置”菜单→【仓库资料设定】不在启用销退仓。
              </p>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>  
</template>   
<script>
  export default {
    data() {
      return {
        activeName2: 'first'
      };
    },
    methods: {
      // handleClick(tab, event) {
      //   console.log(tab, event);
      // }
    }
  };
</script>
<style scoped>
  .ind{
    position: relative;
  }
  .main{
    position: absolute;
    width: 1000px;
    height: 500px;
    left:  250px;
    top: 100px; 
    right: 200px;
    
  }
  .el-tab-pane{
    height: 500px;
  }
  .compon{
    font-size: 20px; 
    color: dodgerblue;
    text-align: left;
  }
  .compon p{
    font-size: 15px;
    color: #000;
    margin-bottom: 30px;
  }
</style>
