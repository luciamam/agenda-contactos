<script >
import { Toaster } from 'vue-sonner';
export default{
  components:{
    Toaster
  }

}

</script>

<template>
  <section>
    <Toaster position="top-center"/>
  
  <router-view/>
  </section>
</template>


