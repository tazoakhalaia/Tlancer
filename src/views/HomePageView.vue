<template>
    <div class="relative h-screen w-screen flex">
        <div class="w-1/2">
            <section class="bg-gray-50 dark:bg-black">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign In and post new articles
              </h1>
              <form class="space-y-4 md:space-y-6" >
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input v-model="email" type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@example.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input v-model="password" type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>
                  <h1 class="text-white">{{ errorMessage }}</h1>
                  <h1 v-if="userNotFound" class="text-red-500 font-bold">{{ userNotFound }}</h1>
                  <button @click.prevent="signIn" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 bg-blue-500">Sign in</button>
                  <div class="text-sm font-light text-gray-500 dark:text-gray-400 flex">
                      Don’t have an account yet?  <Button buttonName="Sign up" @click="openRegistration" />
                  </div>
              </form>
          </div>
      </div>
  </div>
</section>
        </div>
        <transition name="registermodal">
        <div v-if="openRegistrationModal"  class="w-full h-full absolute z-100 flex justify-center items-center">
                <RegisterModal @closeModal="closeModal" />
            </div>
        </transition>
            <div class="w-1/2 min-h-screen">
                <img class="h-full w-full " src="../assets/img/auth-page-background.jpg" alt="auth_background">
            </div>
    </div>
</template>
<script setup> 
import { provide, ref, computed } from 'vue';
import Button from '@/components/ui/ButtonSubmit.vue'
import RegisterModal from '@/components/shared/RegisterModal.vue'
import '@/assets/css/registrationModalAnimation.css'
import { useRouter } from 'vue-router'
import axios from 'axios';
let openRegistrationModal = ref(false)
let email = ref('')
let password = ref('')
let router = useRouter()
let userNotFound = ref('')
provide('closeModal', closeModal)

let errorMessage = computed(() => {
    if(email.value === "" || password.value === ""){
       return 'Please fill all fields'
    }
})

function openRegistration(){
    openRegistrationModal.value = true
}

function closeModal(){
    openRegistrationModal.value = false
}

async function signIn(){
    let token
    try{
    let response = await axios.post('http://exam.tlancer.net/api/login', {
        "email": email.value,
        "password": password.value
    })
    token = response.data.token
    localStorage.setItem('token', token)
    if(token){
        router.push({ path: '/profile' })
    }
}catch(error){
    if (error.response && error.response.status === 401) {
            userNotFound.value = 'User Not found please enter correct credentials'
            setTimeout(() => {
                userNotFound.value = ''
            },2000)
        }
}
}

</script>