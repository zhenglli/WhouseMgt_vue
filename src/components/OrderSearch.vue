<template>
  <div>
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
            prop="onum"
            label="订单编号"
            width="140">
        </el-table-column>
        <el-table-column
          prop="cid"
          label="客户编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="pid"
          label="商品编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="sell_price"
          label="购买价格"
          width="80">
        </el-table-column>
        <el-table-column
          prop="pcount"
          label="购买数量"
          width="80">
        </el-table-column>
        <el-table-column
          prop="create_date"
          label="购买时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="delivery_date"
          label="发货时间"
          width="200">
        </el-table-column>
        <el-table-column
          prop="ostatus"
          label="订单状态"
          width="80">
        </el-table-column>
        <el-table-column
          prop="uid"
          label="操作人员编号"
          width="110">
        </el-table-column>
        <el-table-column
          prop="firstAdress"
          label="地址"
          width="180">
        </el-table-column>
        <el-table-column
          prop="lastAdress"
          label="详细地址"
          width="300">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          width="150">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
          v-if="token_id==1||token_id==2">
          <template slot-scope="scope" >
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
</template>

<script>
  export default {
    props:["token_id","options"],
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
        this.axios.get("/order/v1/search",{
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
          "/order/v1/allOrders",
          {
            params:{
              kw:this.kw,
              pno:i
            }
          }
        ).then(result=>{
          result.data.data=JSON.parse(JSON.stringify(result.data.data));//转为json格式，必写
          this.tableData=result.data.data;
          this.tableData.map(obj=>{
            if(obj.firstAdress){//假如存在地址信息
              let ad=[];
              let ad1=obj.firstAdress.split("/");//切割地址为对应地址编码
              let ad2=this.options.filter(val=>val.value==ad1[0])[0];
              ad.push(ad2.label);
              let ad3=ad2.children.filter(val=>val.value==ad1[1])[0];
              ad.push(ad3.label);
              let ad4=ad3.children.filter(val=>val.value==ad1[2])[0];
              ad.push(ad4.label);
              obj.firstAdress=ad.join("/");//将数组重新转为字符串
            }
            return obj;
          })
          // console.log(this.tableData);
          this.pno=result.data.pno;
          this.pcount=result.data.pageCount;
          for(var i=0;i<this.tableData.length;i++){
            this.search_options.push({
              value:`选项${i}`,
              label:this.tableData[i].onum
            });
          }
        });
      }
    },
    created(){
      this.load();
      this.maxHeight=(document.body.clientHeight)-150;
    },
    data() {
      return {
        maxHeight:0,
        tableData:[],
        pno:0,
        pcount:0,
        kw:"",
        search_options: [{}]
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