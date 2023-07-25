<template>
  <transition name="message">
    <div
      v-if="successMessage"
      class="w-1/6 bg-white flex justify-center items-center rounded-md absolute z-10 left-1/2 top-0 -translate-x-1/2 p-2"
    >
      <h1
        :class="
          successMessage === 'News Uploaded Successfully refresh the page to see your news'
            ? 'text-green-500'
            : 'text-red-500'
        "
        :successMessage="successMessage"
      >
        {{ successMessage }}
      </h1>
    </div>
  </transition>
</template>
<script setup>
import '../../assets/css/uploadSuccess.css'

let { successMessage } = defineProps({ successMessage: { type: String, required: true } })
</script>
