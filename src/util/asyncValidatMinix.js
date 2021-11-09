import axios from "axios";


function useCheck(msg) {
  console.log("统一处理form的校验函数", msg)
  return {
    // 必填项 不能为空
    // methods:{

    required(tipMsg = "不能为空") {
      return { required: true, message: tipMsg, trigger: 'blur' }
    },

    repass(oldPsd) {
      return {
        validator: (rule, value, callback) => {
          if (oldPsd === value) {
            callback()
          } else {
            callback(new Error("两次输入的密码不一致"))
          }
        }, trigger: 'blur'
      }

    },
    tipMsg(msg) {
      return {
        validator: (rule, value, callback) => {
          if (msg) {

            callback(new Error(msg))
          } else {

            callback()
          }
        }, trigger: 'blur'
      }

    },

    queryUsername() {
      return {
        validator: (rule, value, callback) => {
          axios.post("/free/queryUserName", { val: value }).then(res => {
            if (res.data.data.length) {
              callback(new Error(res.data.message));
            } else {
              callback()
            }
          }).catch(err => {
            console.log(err)
            callback(new Error('查询失败'))
          })
        }, trigger: 'blur'
      }
    },
    // }
  }
}

export default useCheck