<template>
  <div class="container d-flex flex-column align-items-center justify-content-center m-auto w-75">
    <div class="d-flex flex-column w-50">
      <div class="container rounded-top header-form">
        <p class="header-form__title">Welcome Back !</p>
        <p class="header-form__subTitle mt-2">Sign in to continue</p>
      </div>
      <div class="container rounded-bottom form-auth">
        <form action="#" class="d-flex flex-column">
          <div class="d-flex flex-column align-items-center w-100 mb-5 form-auth__item">
            <InputText
              id="username"
              type="username"
              placeholder="Enter login"
              aria-describedby="username-help"
              class="p-inputtext-lg"
              v-model="candidate.login"
              :class="{ 'p-invalid': isInvalid }"
            />
            <small v-if="isInvalid" id="username-help" class="p-error mt-2"
              >Неверный логин или пароль!</small
            >
          </div>
          <div class="d-flex flex-column align-items-center w-100 form-auth__item">
            <Password
              id="password"
              type="password"
              :feedback="false"
              placeholder="Enter password"
              aria-describedby="password-help"
              class="p-inputtext-lg"
              v-model="candidate.password"
              :class="{ 'p-invalid': isInvalid }"
            />
            <small v-if="isInvalid" id="password-help" class="p-error mt-2"
              >Неверный логин или пароль!</small
            >
          </div>
          <Button :disabled="isValidate" label="Log In" @click="login" class="mt-5" />
        </form>
      </div>
    </div>
    <router-link class="link" :to="{ name: 'Registration' }">Create account</router-link>
  </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useStore } from 'vuex'
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const candidate = reactive({
  login: '',
  password: '',
})
const isValidate = computed(() => !(!!candidate.login && !!candidate.password))
const isInvalid = ref(false)
const store = useStore()
const router = useRouter()

const login = () => {
  store
    .dispatch('login', { email: candidate.login, password: candidate.password })
    .then((response) => {
      if (response.message) {
        isInvalid.value = true
      } else {
        router.push({ name: 'Main' })
      }
    })
}
</script>

<style lang="scss" scoped>

</style>
