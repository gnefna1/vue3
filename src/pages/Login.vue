<template>
  <div class="login">
    <el-card class="box-card">
      <el-form
        :model="loginForm"
        label-width="80px"
        status-icon
        ref="form"
        class="registerForm"
      >
        <el-form-item
          label="用户名"
          prop="username"
          :rules="[required('用户名不能为空')]"
        >
          <el-input type="text" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
          :rules="[required('密码不能为空'), tipMsg(err)]"
        >
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submit">登陆</el-button>
    </el-card>
  </div>
</template>

<script>
// import pageHead from "../components/pageHead.vue";
// import { afeiCheck } from "../util/asyncValidatMinix.js";
import axios from "../util/initAxios";
import useCheck from "../util/asyncValidatMinix.js";
export default {
  setup() {
    const { required, repass, queryUsername, tipMsg } = useCheck("adsf");
    return { required, repass, queryUsername, tipMsg };
  },
  // mixins: [afeiCheck],
  components: {
    // pageHead
  },
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      err: "",
    };
  },
  methods: {
    submit() {
      console.log(1);
      this.$refs.form.validate((valid) => {
        if (valid) {
          axios.post("/free/login", this.loginForm).then((res) => {
            if (res.data.code === 0) {
              localStorage.setItem("token", res.data.data);
              axios.defaults.headers.common["Authorization"] = res.data.data;

              if (this.$route.query.path) {
                this.$router.push(this.$route.query.path);
              } else {
                this.$router.push("/");
              }
            } else {
              this.err = res.message;
              this.$nextTick(() => {
                this.$refs.form.validateField("password");
              });
            }
          });
        }
      });
    },
  },
};
</script>

<style  scoped>
.box-card {
  width: 480px;
  text-align: center;

  margin: 100px auto;
}
box-card .registerForm {
  margin: 20px;
}
</style>