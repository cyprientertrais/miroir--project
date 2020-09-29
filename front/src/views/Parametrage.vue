<template>
  <div class="parametrage">
    <connection></connection>
  </div>
</template>

<script>
import Connection from '../components/widgets/Connection.vue'
export default {
  name: "parametrage",
  components: {
      Connection
  },
}
</script>

<style scoped>
div{
    color:white
}

.parametrage{
    background-color: #3c3e41;
    height: 100%;
}
</style>
