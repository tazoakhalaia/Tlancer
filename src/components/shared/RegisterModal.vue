<template>
    <div class="bg-gray-500 absolute w-1/4 h-1/2 z-10 rounded-md">
        <input v-model="userName" className="w-full mb-2 h-10 rounded-md  bg-white" type="text" name="name" placeholder="Name" />
        <input v-model="email" className="w-full mb-2 h-10 rounded-md  bg-white" type="email" name="email" placeholder="Email" />
        <input v-model="password" className="w-full mb-2 h-10 rounded-md  bg-white" type="password" name="password" placeholder="Password" />
        <input v-model="repeatPassword" className="w-full mb-2 h-10 rounded-md  bg-white" type="password" name="password_confirmation" placeholder="Repeat Password" />
        <button class="bg-red-500" @click="register">Register</button>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import axios from 'axios'
let userName = ref('')
let password = ref('')
let repeatPassword = ref('')
let email = ref('')

async function register() {
    try {
        let response = await axios.post('http://exam.tlancer.net/api/register', {
        "name": userName.value,
        "email": email.value,
        "password": password.value,
        "password_confirmation": repeatPassword.value
    })
    console.log(response.data);
} catch(error){
    console.log("Error" + error);
}
}
</script>