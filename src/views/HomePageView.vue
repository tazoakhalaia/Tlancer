<template>
    <div class="bg-gradient-to-r from-teal-100 via-sky-100 to-teal-100 h-screen w-screen flex justify-center items-center">
        <div class="flex">
        <ButtonModal buttonName="Register" />
        <ButtonModal buttonName="Login" />
        </div>
    </div>
</template>
<script setup> 
import ButtonModal from '../components/ui/ButtonModal.vue';
</script>