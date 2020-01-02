<template>
  <div>
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
        prop="repertory_count"
        label="库存数量">
      </el-table-column>
      <el-table-column
        prop="pid"
        label="商品ID">
      </el-table-column>
      <el-table-column
        prop="family_id"
        label="系列ID">
      </el-table-column>
      <el-table-column
        prop="pname"
        label="商品名称">
      </el-table-column>
      <el-table-column
        prop="sell_price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="sold_count"
        label="已售出的数量">
      </el-table-column>
      <el-table-column
        prop="memory"
        label="内存容量">
      </el-table-column>
      <el-table-column
        prop="resolution"
        label="分辨率">
      </el-table-column>
      <el-table-column
        prop="cpu"
        label="处理器">
      </el-table-column>
      <el-table-column
        prop="video_memory"
        label="显存容量">
      </el-table-column>
      <el-table-column
        prop="category"
        label="所属分类">
      </el-table-column>
      <el-table-column
        prop="disk"
        label="硬盘容量及类型">
      </el-table-column>
      <el-table-column
        prop="is_onsale"
        label="是否促销中">
      </el-table-column>
      <el-table-column
        prop="pv_id"
        label="供应商ID">
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
  data(){
    return{
      maxHeight:0,
      tableData:[],
      pno:0,
      pcount:0,
      //库存查询标签页数据
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
  },
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
                if(result.data.code == -1){
                  this.$message({
                    type: 'info',
                    message: '请先登录'
                  });
                  this.$router.push("/login");
                }else if(result.data.code==200){
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
    changePage(i){
      this.load(i-1);
    },
    load(i){
      this.axios.get(
        "/product/v1/repertory",
        {
          params:{
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
    this.load();
    this.maxHeight=(document.body.clientHeight)-150;
  }
}
</script>

<style scoped>
   .el-tabs{
    box-shadow: none;
    border:none;
  }
</style>