<template>
    <div>
        <header class="bg-black h-20 flex justify-center items-center">
            <h1 class="text-white">Post new article</h1>
        </header>
        <div class="m-auto w-1/2 bg-gray-200 mt-2 pb-2 rounded-md">
            <h1 class="text-center font-bold">Create Post</h1>
            <hr class="h-0.5 bg-black">
            <div class="w-full mt-2 pl-2 flex">
                <UserIcon class="w-10 h-10 border border-black rounded-full" />
                <div class="ml-2">
                    <h1 class="text-xs font-bold">UserName</h1>
                    <h1 class="text-xs font-bold bg-black text-white rounded-sm p-0.5">New Post</h1>
                </div>
            </div>
            <div class="w-full mt-2">
                <textarea v-model="titleValue"  class="resize-none outline-none w-full h-20" placeholder="Write Your Title"></textarea>
                <textarea v-model="contentValue" class="resize-none outline-none w-full h-20" placeholder="Write Your Content"></textarea>
                </div>
                <Button @click.prevent="sendArticleRequest" buttonName="Post" />
        </div>
        <div v-for="(news, index) in newsArray" :key="index" class="w-1/2 bg-blue-500 m-auto mt-4 break-all rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] pb-4">
            <h1 class="font-bold text-md text-center text-white">{{ news.title }}</h1>
            <h1 v-if="!isEditing(news.id)" class="text-md mt-2 text-white">{{ news.content }}</h1>
            <input class="mb-2" v-else type="text" v-model="editedContetnValue[index]">
            <div>
                <button @click="deleteNews(news.id)" class="p-1 bg-red-500 rounded-sm text-white">Delete</button>
                <button v-if="isEditing(news.id)" @click="updateContent(news.id, news.title,index)" class="p-1 bg-orange-500 ml-2 rounded-sm text-white">Save</button>
                <button v-else @click="editId = news.id" class="p-1 bg-orange-500 ml-2 rounded-sm text-white">Edit</button>
            </div>
            <hr class="h-1 bg-black mt-2">
            <div class="mt-2 w-full">
                <input v-model="commentValue[index]" @change="writeComment(news.id, index)" class="w-1/2 rounded-md pl-2 bg-gray-100 h-10 outline-none" type="text" placeholder="Write Comment">
            </div>
            <div v-for="comment in news.comment" class="mt-2 p-2 break-all w-full">
                <h1 class="text-white"> ->  {{ comment.content }}</h1>
                <hr class="h-0.5 bg-black">
            </div>
        </div>
    </div>
</template>
<script setup>
import axios from 'axios';
import { ref, reactive ,onMounted } from 'vue'
import UserIcon from '@/components/icons/UserIcon.vue'
import Button from '@/components/ui/ButtonSubmit.vue'
let token = localStorage.getItem('token')
let titleValue = ref('')
let contentValue = ref('')
let newsArray = reactive([])
let commentValue = reactive([])
let editId = ref(null)
let editedContetnValue = reactive([])
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

async function sendArticleRequest(){
    let response = await axios.post('http://exam.tlancer.net/api/news', {
        title: titleValue.value,
        content: contentValue.value
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

async function deleteNews(newsId){
    let response = await axios.delete(`http://exam.tlancer.net/api/news/${newsId}`, config)
    console.log(response);
}

async function updateContent(id,title,index){
    console.log(id, editedContetnValue[index]);
    let response = await axios.put(`http://exam.tlancer.net/api/news/${id}`, {
        title: title,
        content: editedContetnValue[index]
    } ,config)
    
    console.log(response);
}

const isEditing = (id) => {
  return editId.value === id
};

</script>