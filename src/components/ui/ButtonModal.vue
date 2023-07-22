<template>
    <div>
        <button type="button" class="uppercase text-white bg-gradient-to-r from-blue-500 via-blue-600 
        to-blue-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center 
        mr-2 mb-22" :buttonName="buttonName">{{ buttonName }}</button>        
    </div>
</template>
<script setup>
import { defineProps } from 'vue';
defineProps({
    buttonName: {
        type: String,
        required: true
    }
})
</script>