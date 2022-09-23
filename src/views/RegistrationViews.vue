<template>
  <div class="container d-flex flex-column align-items-center justify-content-center m-auto w-75">
    <div class="d-flex flex-column w-50">
      <div class="container rounded-top header-form">
        <p class="header-form__title">Sign up!</p>
      </div>
      <div class="container rounded-bottom form-auth">
        <form action="#" class="d-flex flex-column">
          <div class="d-flex flex-column align-items-center w-100 mb-5 form-auth__item">
            <InputText
              id="username"
              type="username"
              placeholder="Enter your email"
              aria-describedby="username-help"
              class="p-inputtext-lg"
              v-model="candidate.login"
            />
            <small v-if="isInvalid" id="username-help" class="p-error mt-2"
              >Почта должна быть формата test@mail.ru!</small
            >
          </div>
          <div class="d-flex flex-column align-items-center w-100 form-auth__item">
            <Password
              id="password"
              type="password"
              :feedback="false"
              placeholder="Enter your password"
              aria-describedby="password-help"
              class="p-inputtext-lg"
              v-model="candidate.password"
            />
          </div>
          <Button :disabled="isValidate" label="Sign Up" @click="registration" class="mt-5" />
        </form>
      </div>
    </div>
    <router-link class="link" :to="{ name: 'Login' }">Sign in</router-link>
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
const router = useRouter()
const isValidate = computed(() => !(!!candidate.login && !!candidate.password))
const isInvalid = ref(false)
const store = useStore()
const registration = () => {
  store
    .dispatch('registration', { email: candidate.login, password: candidate.password })
    .then(() => {
      if (store.state.isAuth) {
        router.push({ name: 'Login' })
      } else {
        isInvalid.value = true
      }
    })
    .catch(() => {
      isInvalid.value = true
    })
}
</script>

<style lang="scss" scoped>

</style>
