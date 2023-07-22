<template>
    <div class="relative bg-gradient-to-r from-teal-700 via-sky-700 to-teal-700 h-screen w-screen flex justify-center items-center">
        <div class="flex">
        <ButtonModal buttonName="Register" @click="hello" />
        <ButtonModal buttonName="Login" />
        </div>
        <div class="absolute w-1/4 h-1/2 z-10">
        <RegisterModal />
        </div>
    </div>
</template>
<script setup> 
import ButtonModal from '@/components/ui/ButtonModal.vue'
import RegisterModal from '@/components/shared/RegisterModal.vue'

function hello(){
    console.log('hello');
}
</script>