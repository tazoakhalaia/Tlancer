<template>
    <div>
        <header class="bg-black h-20 flex justify-center items-center">
            <h1 class="text-white">Post new article</h1>
            <button class="text-white ml-2" @click.prevent="send">create news</button>
        </header>
        <div v-for="(news, index) in newsArray" :key="index" class="w-1/2 bg-gray-700 m-auto mt-4 rounded-sm shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] pb-4">
            <h1 class="font-bold text-md text-center text-white">{{ news.title }}</h1>
            <h1 class="text-sm mt-2 text-white">{{ news.content }}</h1>
            <div class="mt-2 w-full">
                <input v-model="commentValue[index]" @change="writeComment(news.id, index)" class="w-full bg-gray-100 h-10 outline-none" type="text" placeholder="Write Comment">
            </div>
            <div v-for="comment in news.comment" class="border border-white mt-2 p-2 break-all w-full">
                <h1 class="text-white"> ->  {{ comment.content }}</h1>
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, reactive ,onMounted } from 'vue'
let newsArray = reactive([])
let token = localStorage.getItem('token')
let commentValue = reactive([])
let config = {
    headers: {
        Authorization: `Bearer ${token}`,
      }
}
onMounted(async () =>{
    try {
    let response = await axios.get('http://exam.tlancer.net/api/news');
    let data = response.data
    newsArray.push(...data)
    console.log(data)
  } catch (error) {
    console.error(error);
  }
})

async function send(){
    let response = await axios.post('http://exam.tlancer.net/api/news', {
        title: 'example',
        content: 'example'
    }, config)
    console.log(response);
}

async function writeComment(newsId, index){
    console.log(commentValue[index]);
    let response = await axios.post('http://exam.tlancer.net/api/comments',{
        content: commentValue[index],
        news_id: newsId
    } ,config)
    console.log(response.data);
}
</script>