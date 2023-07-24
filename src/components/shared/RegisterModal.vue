<template>
    <div class="bg-gray-700 absolute w-1/4 z-10 rounded-md p-2">
        <input v-model="userName" className="w-full mb-4 h-10 rounded-md bg-white pl-2 placeholder:text-black" type="text" name="name" placeholder="Name" />
        <input v-model="email" className="w-full mb-4 h-10 rounded-md bg-white pl-2 placeholder:text-black" type="email" name="email" placeholder="Email" />
        <input v-model="password" className="w-full mb-4 h-10 rounded-md bg-white pl-2 placeholder:text-black" type="password" name="password" placeholder="Password" />
        <input v-model="repeatPassword" className="w-full mb-4 h-10 rounded-md bg-white pl-2 placeholder:text-black" type="password" name="password_confirmation" placeholder="Repeat Password" />
        <button class="bg-blue-500 p-2 rounded-md text-white" @click="register">Register</button>
        <button class="bg-red-500 p-2 rounded-md text-white ml-2" @click="onCloseModal">Close</button>
    </div>
</template>
<script setup>
import { inject, ref } from 'vue'
import axios from 'axios'
let userName = ref('')
let password = ref('')
let repeatPassword = ref('')
let email = ref('')
let closeModal = inject('closeModal')

function onCloseModal(){
    closeModal()
}

async function register() {
    if(password.value != repeatPassword.value){
        console.log('nope');
    }
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