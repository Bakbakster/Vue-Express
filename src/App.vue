<template>
  <router-view></router-view>
</template>

<script setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const checkAuth = async () => {
  await store.dispatch('checkAuth').then((response) => {
    if (response.status) {
      router.push({ name: 'Main' })
    } else {
      router.push({ name: 'Login' })
    }
  })
}
checkAuth()
</script>

<style lang="scss">

</style>
