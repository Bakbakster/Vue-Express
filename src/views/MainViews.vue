<template>
  <h1>Добрый день {{ user.email }}</h1>
  <h2>
    {{ user.isActivated ? 'Аккаунт активирован' : `Для активации аккаунта проверьте почту:)` }}
  </h2>
  <div v-for="(user, index) in users" :key="user._id">{{ index + 1 }} : {{ user.email }}</div>
  <Button label="Получить пользователей" @click="getUsers" class="mt-5" />
  <Button label="Выйти" @click="logout" class="mt-5" />
</template>

<script setup>
import Button from 'primevue/button'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const users = ref([])
const logout = async () => {
  try {
    await store.dispatch('logout').then(() => {
      router.push({ name: 'Login' })
    })
  } catch (e) {
    console.log(e)
  }
}
const getUsers = async () => {
  const response = await store.dispatch('getUsers')
  if (response.status === 200) {
    users.value = response.data
  }
}
const user = computed(() => store.getters.USERS)
</script>

<style scoped>

</style>
