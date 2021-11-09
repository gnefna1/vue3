<template>
  <div class="register">
    <!-- <pageHead></pageHead> -->
    <el-card class="box-card">
      <el-form
        :model="registerForm"
        label-width="80px"
        status-icon
        ref="form"
        class="registerForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
          :rules="[required('用户名不能为空'), queryUsername()]"
        >
          <el-input
            type="text"
            v-model="registerForm.username"
            @change="queryUsername"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[required('密码不能为空')]"
        >
          <el-input type="password" v-model="registerForm.password"></el-input>
        </el-form-item>
        <el-form-item
          v-if="registerForm.password"
          label="确认密码"
          prop="repassword"
          :rules="[required('要确认密码的'), repass(registerForm.password)]"
        >
          <el-input
            type="repassword"
            v-model="registerForm.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          prop="email"
          :rules="[required('邮箱不能为空')]"
        >
          <el-input type="repassword" v-model="registerForm.email"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit">注册</el-button>
    </el-card>
  </div>
</template>

<script>
// import pageHead from "../components/pageHead.vue";
// import { afeiCheck } from "../util/asyncValidatMinix.js";
import axios from "../util/initAxios";
import useCheck from "../util/asyncValidatMinix.js";
import { reactive } from "vue";
export default {
  // mixins: [afeiCheck],
  setup() {
    const { required, repass, queryUsername, tipMsg } = useCheck("adsf");
    const registerForm = reactive({
      registerForm: {
        username: "",
        password: "",
        repassword: "",
        email: "",
      },
    });
    return { required, repass, queryUsername, tipMsg, registerForm };
  },
  data() {
    return {
      // registerForm: {
      //   username: "",
      //   password: "",
      //   repassword: "",
      //   email: "",
      // },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios
            .post("/free/queryUserName/register", this.registerForm)
            .then((res) => {
              if (res.data.code === 0) {
                console.log("this", this);
                console.log("router", this.$router);

                this.$router.push("/login");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
};
</script>

<style>
.box-card {
  width: 480px;
  text-align: center;
  margin: 100px auto;
}
.box-card .registerForm {
  margin: 20px;
}
</style>
