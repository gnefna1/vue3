<template>
  <!-- <div class=""> -->
  <h5 @click="changeTitle">{{ title }}</h5>
  <el-input
    v-model="condition.customer"
    placeholder="用户"
    class="input"
  ></el-input>
  <el-input
    v-model="condition.type"
    placeholder="类型"
    class="input"
  ></el-input>
  <el-button @click="queryClick(1)">查询</el-button>
  <el-button @click="addRowOrUpdate">添加</el-button>
  <el-table :data="list" border :height="tableHeight">
    <el-table-column label="id" prop="id"></el-table-column>
    <el-table-column label="用户" prop="customer"></el-table-column>
    <el-table-column label="时间" prop="time" width="200px"></el-table-column>
    <el-table-column label="类型" prop="type"></el-table-column>
    <el-table-column label="数量" prop="count"></el-table-column>
    <el-table-column label="价格" prop="price"></el-table-column>
    <el-table-column label="操作">
      <template v-slot="{ row }">
        <el-button type="primary" size="small" @click="addRowOrUpdate(row)"
          >编辑</el-button
        >
        <el-button type="primary" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-show="list.length"
    @size-change="sizeChange"
    @current-change="queryClick"
    v-model:current-page="current"
    v-model:page-size="size"
    :page-sizes="[1, 2, 5, 10, 20]"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>

  <el-dialog title="订单" v-model="dialog.show" center>
    <el-form :model="dialog.form" ref="dialogForm" label-width="100px">
      <el-form-item label="客户" prop="customer" :rules="[required()]">
        <el-input placeholder="客户" v-model="dialog.form.customer"> </el-input>
      </el-form-item>
      <!-- <el-form-item label="时间" prop="time" :rules="[required()]">
                    <el-date-picker
                    style="width:100%;"
                    v-model="dialog.form.time"
                 />
                </el-form-item> -->
      <el-form-item label="类型" prop="type" :rules="[required()]">
        <el-input placeholder="类型" v-model="dialog.form.type"> </el-input>
      </el-form-item>
      <el-form-item label="数量" prop="count" :rules="[required()]">
        <el-input placeholder="数量" v-model="dialog.form.count"> </el-input>
      </el-form-item>
      <el-form-item label="价格" prop="price" :rules="[required()]">
        <el-input placeholder="价格" v-model="dialog.form.price"> </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="small" type="primary" @click="dialog.show = false"
          >取消</el-button
        >
        <el-button size="small" @click="dialog.form.id ? editeRow() : addRow()"
          >确定</el-button
        >
      </span>
    </template>
  </el-dialog>
  <!-- </div> -->
</template>

<script>
// import { base } from "../../../mixins/base";
// import { afeiCheck } from "../../../util/asyncValidatMinix";
import useCheck from "../util/asyncValidatMinix.js";
import axios from "../util/initAxios";
import useBase from "../util/baseMinix";
import { onMounted, ref } from "vue";
export default {
  // mixins: [base, afeiCheck],

  setup(prop, context) {
    console.log("prop", prop);
    console.log("context", context);
    let { condition, list, total, size, current, queryClick, sizeChange } =
      useBase(getList);
    function getList() {
      // console.log("condition.customer", condition.customer);
      axios
        .post("/free/order/queryOrder", {
          condition: condition,
          pagger: { current: current.value, size: size.value },
        })
        .then((res) => {
          if (res.data.code === 0) {
            list.value = res.data.data.resulte || [];
            total.value = res.data.data.total;
          }
        });
    }
    onMounted(() => {
      getList();
    });

    const { required, repass, queryUsername, tipMsg } = useCheck("adsf");

    const title = ref("title");
    const changeTitle = () => {
      title.value = title.value.split("").reverse().join();
    };

    return {
      title,
      getList,
      changeTitle,
      condition,
      list,
      total,
      size,
      current,
      queryClick,
      sizeChange,
      required,
      repass,
      queryUsername,
      tipMsg,
    };
  },
  data() {
    return {
      dialog: {
        form: {},
        show: false,
      },
      tableHeight: window.innerHeight * 0.7,
    };
  },
  // created() {
  //   this.getList();
  // },
  methods: {
    addRowOrUpdate(row) {
      if (row.id) {
        this.dialog.form = Object.assign({}, this.dialog.form, row);
      } else {
        this.dialog.form = {};
        this.$nextTick(() => {
          if (this.$refs.dialogForm) {
            this.$refs.dialogForm.clearValidate();
          }
        });
      }
      this.dialog.show = true;
    },
    addRow() {
      let add = () => {
        return axios.post(
          "/free/order/createOrder",
          this.dialog && this.dialog.form
        );
      };
      this.addAndUpdateCallback(add);
    },
    editeRow() {
      let update = () => {
        return axios.post("/free/order/updateOrder", this.dialog.form);
      };
      this.addAndUpdateCallback(update);
    },
    addAndUpdateCallback(cb) {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          cb().then((res) => {
            if (res.data.code === 0) {
              this.dialog.show = false;
              // this.getList();

              // console.log("setup", this.$options.setup());
              // const { getList, changeTitle } = this.$options.setup();
              // changeTitle();
              // getList.call(this);
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.input {
  width: 200px;
  margin-bottom: 20px;
}
</style>