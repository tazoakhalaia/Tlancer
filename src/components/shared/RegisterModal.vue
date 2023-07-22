<template>
    <div class="bg-gray-500 h-full rounded-md">
        <form @submit.prevent="register">
        <input v-model="userName" className="w-full mb-2 h-10 rounded-md  bg-white" type="text" name="name" placeholder="Name" />
        <input v-model="email" className="w-full mb-2 h-10 rounded-md  bg-white" type="email" name="email" placeholder="Email" />
        <input v-model="password" className="w-full mb-2 h-10 rounded-md  bg-white" type="password" name="password" placeholder="Password" />
        <input v-model="repeatPassword" className="w-full mb-2 h-10 rounded-md  bg-white" type="password" name="password_confirmation" placeholder="Repeat Password" />
    <button class="bg-red-500" type="submit">Register</button>
    </form>
    </div>
</template>
<script setup>
import { ref } from 'vue';

let userName = ref('')
let password = ref('')
let repeatPassword = ref('')
let email = ref('')

function register(){
    console.log({
        'name': userName.value,
        "email": email.value,
        "password": password.value,
        "repeatpassword": repeatPassword.value
    });
}
</script>