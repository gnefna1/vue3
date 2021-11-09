import { reactive, ref } from "vue"


export default function (getList) {
  let condition = reactive({})
  // const condition = {}
  let list = ref([])

  // let list = ref([])
  let total = ref(0)
  let size = ref(10)
  let current = ref(1)
  function queryClick(num) {
    current.value = num
    getList()
  }

  function sizeChange(pageSize) {
    size.value = pageSize
    current.value = 1
    getList()
  }

  return {
    condition, list, total, size, current, queryClick, sizeChange
  }
}