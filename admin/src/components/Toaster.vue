<template>
  <vue-toast ref="toast"></vue-toast>
</template>

<script>
  import VueToast from 'vue-toast'
  import { mapState, mapActions } from 'vuex'

  export default {
    components: { VueToast },
    computed: {
      ...mapState({
        msg: ({msg}) => msg.message
      })
    },
    watch: {
      'msg': {
        handler: function (val, oldVal) {
          if (val.content !== '') {
            this.showToastr(val.content, val.type)
            this.hideMsg()
          }
        },
        deep: true
      }
    },
    methods: {
      ...mapActions([
        'showMsg',
        'hideMsg'
      ]),
      showToastr (content, type, position = 'top right') {
        const toast = this.$refs.toast
        toast.setOptions({ maxToasts: 3, position: position })
        toast.showToast(content, {
          theme: type,
          timeLife: 2000,
          closeBtn: false
        })
      }
    }
  }
</script>
