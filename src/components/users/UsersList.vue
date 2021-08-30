<template>
<button @click="confirmInput">confirm</button>
  <ul>
    <user-item v-for="user in users" :key="user.id" :name="user.fullName" :role="user.role"></user-item>
  </ul>
</template>

<script>
import UserItem from './UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  methods:{
    confirmInput(){
      this.$router.push('/teams')
     // this.$router.back()
     // this.$router.forward()
    }
  },
  // beforeRouteEnter (to, from, next) {
  //   // ...
  //   console.log(to,from)
  // next()
  // }

  // beforeRouteLeave (to, from, next) {
  //   // primarly used to warn the user, if there is unsaved  changes in the page,
  //   // before leaving 
  // }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>