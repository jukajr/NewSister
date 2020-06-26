<template>
  <router-view/>
</template>

<script>
  import { EventBus } from './providers';

  export default {
    name: 'app',
    created() {
      EventBus.$on('toast', event => this.$bvToast.toast(event.message, {
        ...event,
        toaster: 'b-toaster-bottom-center',
        title: 'Mensagem',
        solid: true,
      }));
    }
  };
</script>

<style lang="scss">
  @import 'node_modules/bootstrap/scss/bootstrap';
  @import 'node_modules/bootstrap-vue/src/index.scss';

  body{
    font-family: 'Roboto', sans-serif;
    font-size: 14px;
  }
</style>
