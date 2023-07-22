<template>
    <div class="relative bg-gradient-to-r from-teal-700 via-sky-700 to-teal-700 h-screen w-screen flex justify-center items-center">
        <div class="flex">
        <ButtonModal buttonName="Register" @click="openRegistration" />
        <ButtonModal buttonName="Login" />
        </div>
            <transition name="registermodal">
                <RegisterModal  v-if="openRegistrationModal" />
            </transition>
    </div>
</template>
<script setup> 
import { ref } from 'vue';
import ButtonModal from '@/components/ui/ButtonModal.vue'
import RegisterModal from '@/components/shared/RegisterModal.vue'
import '@/assets/css/registrationModalAnimation.css'
let openRegistrationModal = ref(false)

function openRegistration(){
    openRegistrationModal.value = true
}
</script>