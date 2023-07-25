<template>
    <div class="bg-gray-700 absolute w-1/4 z-10 rounded-md p-2">
        <input v-model="userName" className="w-full mb-4 h-10 rounded-md bg-white pl-2 placeholder:text-black" type="text" name="name" placeholder="Name" />
        <input v-model="email" className="w-full mb-4 h-10 rounded-md bg-white pl-2 placeholder:text-black" type="email" name="email" placeholder="Email" />
        <input v-model="password" className="w-full mb-1 h-10 rounded-md bg-white pl-2 placeholder:text-black" type="password" name="password" placeholder="Password" />
        <h6 class="mb-4 text-xs text-white font-bold">Min 8 characters</h6>
        <input v-model="repeatPassword" className="w-full mb-4 h-10 rounded-md bg-white pl-2 placeholder:text-black" type="password" name="password_confirmation" placeholder="Repeat Password" />
       <h1 class="text-white">{{ message }}</h1>
       <h1 class="mb-2 text-white">{{ fillFieldsMessage }}</h1>
       <h1 class="mb-2 text-white">{{ passwordMessage }}</h1>
        <button class="bg-blue-500 p-2 rounded-md text-white" @click="register">Register</button>
        <button class="bg-red-500 p-2 rounded-md text-white ml-2" @click="onCloseModal">Close</button>
    </div>
</template>
<script setup>
import { inject, ref, computed } from 'vue'
import axios from 'axios'
let userName = ref('')
let password = ref('')
let repeatPassword = ref('')
let email = ref('')
let fillFieldsMessage = ref('')
let passwordMessage = ref('')
let closeModal = inject('closeModal')

function onCloseModal(){
    closeModal()
}

let message = computed(() => {
    if(repeatPassword.value != ""){
        if(repeatPassword.value != password.value){
        return 'Repeat the password correctly'
    }
    }
})

async function register() {
    if(userName.value === "" || email.value === "" || password.value === ""){
        fillFieldsMessage.value = 'Please fill all fields'
        setTimeout(() => {
            fillFieldsMessage.value = ''
        },2000)
    }

    if(password.value !="" && password.value.length < 8){
        fillFieldsMessage.value = 'Password must be more than 8 characters'
        setTimeout(() =>{
            fillFieldsMessage.value = ''
        },2000)
    }

    if(password.value != ''){
        if(repeatPassword.value === ''){
            passwordMessage.value = 'Must repeat password'
            setTimeout(() => {
                passwordMessage.value = ''
            },2000)
        }
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