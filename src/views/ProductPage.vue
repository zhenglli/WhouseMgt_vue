<template>
  <div>
    <main-aside></main-aside>
    <main-header></main-header>
    <div class="repertory">
      <div class="order-page">
        </div>
         <el-select v-model="kw" filterable placeholder="请选择" @change="search">
          <el-option
            v-for="item in search_options"
            :key="item.value"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
           <el-button type="primary" @click="search">搜索</el-button>
         <el-table 
            :data="tableData"
            min-height="500"
            :max-height="maxHeight"
            @cell-dblclick="edit"
            :border=true
            :cell-style="{'padding-left':0,'text-align':'center'}"
            :header-cell-style="{'text-align':'center'}"
            :highlight-current-row=true>
          <el-table-column
            fixed
            prop="pid"
            label="商品ID"
            width="70">
        </el-table-column>
        <el-table-column
          prop="family_id"
          label="系列ID"
          width="70">
        </el-table-column>
        <el-table-column
          prop="pname"
          label="商品名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sell_price"
          label="价格"
          width="100">
        </el-table-column>
        <el-table-column
          prop="spec"
          label="规格/颜色"
          width="300">
        </el-table-column>
        <el-table-column
          prop="os"
          label="操作系统"
          width="100">
        </el-table-column>
        <el-table-column
          prop="memory"
          label="内存容量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="resolution"
          label="分辨率"
          width="120">
        </el-table-column>
        <el-table-column
          prop="video_card"
          label="显卡型号"
          width="120">
        </el-table-column>
        <el-table-column
          prop="cpu"
          label="处理器"
          width="120">
        </el-table-column>
        <el-table-column
          prop="video_memory"
          label="显存容量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="category"
          label="所属分类"
          width="120">
        </el-table-column>
        <el-table-column
          prop="disk"
          label="硬盘容量及类型"
          width="140">
        </el-table-column>
        <el-table-column
          prop="shelf_time"
          label="上架时间"
          width="120">
        </el-table-column>
        <el-table-column
          prop="sold_count"
          label="已售出的数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="repertory_count"
          label="库存数量"
          width="120">
        </el-table-column>
        <el-table-column
          prop="is_onsale"
          label="是否促销中"
          width="100">
        </el-table-column>
        <el-table-column
          prop="pv_id"
          label="供应商ID"
          width="100">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="pcount"
        @current-change="changePage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
   
    methods: {
      edit(row,column,cell,event){
        var element=event.target;
        if(element.nodeName=="DIV"){
          var newobj = document.createElement('input');//创建一个input元素
          var oldhtml=element.innerHTML;//获得元素之前的内容
          newobj.type = 'text';//为newobj元素添加类型
          newobj.value=oldhtml;
          newobj.style.cssText=`
            width:${element.parentNode.offsetWidth-30}px;
            height:41px;
          `;
          element.innerHTML='';//设置元素内容为空
          element.appendChild(newobj);//添加子元素
          newobj.focus();//获得焦点
          //设置newobj失去焦点的事件
          newobj.onblur = ()=>{
            //下面应该判断是否做了修改并使用axios代码请求服务端将对应属性名与修改后的数据提交
            //当触发时判断newobj的值是否为空，为空则不修改，并返回oldhtml
            if(newobj.value){
              if(newobj.value!==oldhtml){ //如果新值跟旧值不相同
                this.axios.post("/product/v1/updata",{
                  params:{
                    pid:row.pid,
                    propName:column.property,
                    value:newobj.value
                  }
                }).then(result=>{
                  if(result.data.code==200){
                    this.$message({
                      type: 'success',
                      message: '修改成功!'
                    });
                    element.innerHTML = newobj.value;
                  }else{
                    this.$message({
                      type: 'info',
                      message: '数据库修改失败'
                    }); 
                    element.innerHTML=oldhtml;
                  }
                })
              }else{//如果新值跟旧值相同，则提示“修改失败”
                this.$message({
                  type: 'info',
                  message: '修改失败'
                }); 
                element.innerHTML=oldhtml;
              }
            }else{
              this.$message({
                type: 'info',
                message: '修改失败'
              }); 
              element.innerHTML=oldhtml;
            }
          }
        }
      },
      deleteRow(index, rows) {
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.axios.delete("/product/v1/deldata",{
            params:{
              pid:rows[index].pid
            } 
          }).then(result=>{
            if(result.data.code==200){
              rows.splice(index, 1);
              // console.log(result.data);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else{
              this.$message({
                type: 'info',
                message: '删除失败'
              });  
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      changePage(i){
        this.load(i-1);
      },
      search(){
        this.axios.get("/product/v1/search",{
          params:{
            kw:this.kw
          }
        }).then(result=>{
          this.tableData=result.data.data;
          this.pno=result.data.pno;
          this.pcount=result.data.pageCount;
        })
      },
      load(i){
        this.axios.get(
          "/product/v1/allProduct",
          {
            params:{
              kw:this.kw,
              pno:i
            }
          }
        ).then(result=>{
          this.tableData=result.data.data;
          this.pno=result.data.pno;
          this.pcount=result.data.pageCount;
        });
      }
    },
    created(){
      this.maxheight=parseInt(window.screen.availHeight)/1.1;
      this.load();
      this.maxHeight=(document.body.clientHeight)-80;
    },
    // watch:{
    // kw(){
      // this.search();
    // }
  // },
    data() {
      return {
        maxHeight:0,
        tableData:[],
        pno:0,
        pcount:0,
        kw:"",
        search_options: [{
        value: '选项1',
        label: 'AppleMacBook Air'
      }, {
        value: '选项2',
        label: '小米'
      }, {
        value: '选项3',
        label: 'ThinkPad'
      }, {
        value: '选项4',
        label: '华硕'
      }, {
        value: '选项5',
        label: '联想'
      }, {
        value: '选项6',
        label: '戴尔'
      }, {
        value: '选项7',
        label: '神舟'
      }]
      }
    }
  }
</script>

<style scoped>
  .repertory{
    width:96%;  
    position:relative;
    left:4%;
    top:48px;
    background-color:#eceff3;
  }
  .selectstyle{
    background-color: #FFF;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #DCDFE6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
    width:220px;
  }
</style>