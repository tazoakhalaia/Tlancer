<template>
    <div class="bg-gray-800 min-h-screen">
        <header class="bg-gray-800 h-20 flex justify-center items-center">
            <h1 class="text-white font-bold">Post new article</h1>
            <div>
                <button @click="logOut" class="ml-4 bg-white">Log Out</button>
            </div>
        </header>
        <div class="m-auto w-1/2 bg-gray-200 mt-2 p-2 rounded-md">
            <h1 class="text-center font-bold">Create Article</h1>
            <hr class="h-0.5 bg-black">
            <div class="w-full mt-2 pl-2 flex">
                <UserIcon class="w-10 h-10 border border-black rounded-full" />
                <div class="ml-2">
                    <h1 class="text-xs font-bold">{{ UserName }}</h1>
                    <h1 class="text-xs font-bold bg-black text-white rounded-sm p-0.5">New Post</h1>
                </div>
            </div>
            <div class="w-full mt-2 p-2 rounded-md">
                <textarea v-model="titleValue"  class="resize-none outline-none rounded-sm w-full h-6 placeholder:text-black pl-2" placeholder="Write Your Title"></textarea>
                <textarea v-model="contentValue" class="resize-none outline-none rounded-sm w-full h-20 placeholder:text-black pl-2" placeholder="Write Your Content"></textarea>
                </div>
                <Button @click.prevent="sendArticleRequest" buttonName="Post" />
        </div>
        <div v-for="(news, index) in newsArray" :key="index" class="w-1/2 bg-gray-200 p-2 m-auto mt-4 break-all rounded-md shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] pb-4">
            <h1 class="font-bold text-md text-center text-black underline">{{ news.title }}</h1>
            <h1 v-if="!isEditing(news.id)" class="text-md font-bold mt-2 text-black">{{ news.content }}</h1>
            <input class="mb-2 w-full rounded-sm pl-2 h-8" v-else type="text" v-model="editedContetnValue[index]" placeholder="Write Your Content">
            <div v-if="news.user_id === loginUserId">
                <hr class="h-0.5 bg-black mt-2 mb-2">
                <button @click="deleteNews(news.id)" class="p-1 bg-red-500 rounded-sm text-white">Delete</button>
                <button v-if="isEditing(news.id)" @click="updateContent(news.id, news.title,index)" class="p-1 bg-orange-500 ml-2 rounded-sm text-white">Save</button>
                <button v-else @click="editId = news.id" class="p-1 bg-orange-500 ml-2 rounded-sm text-white">Edit</button>
            </div>
            <hr class="h-0.5 bg-black mt-2">
            <div class="mt-2 w-full">
                <input v-model="commentValue[index]" @change="writeComment(news.id, index)" class="w-1/2 rounded-md pl-2 bg-gray-500 h-10 outline-none placeholder:text-white text-white" type="text" placeholder="Write Comment">
            </div>
            <hr class="h-0.5 bg-black mt-2">
            <div v-for="(comment, index) in news.comment" :key="index" class="mt-2 p-2 w-full flex justify-between">
                <div class="w-1/2 break-all flex items-center">
                    <div>
                    <CommentIcon class="w-5 h-5 mr-2" />
                </div>
                <h1 v-if="!isEditingComment(comment.id)" class="text-black text-sm font-medium">{{ comment.content }}</h1>
                <input v-else type="text" v-model="editedCommentValue[index]">
            </div>
                <div v-if="comment.user_id === loginUserId">
                    <button @click="deletComment(comment.id)" class="bg-red-500 p-1 text-white rounded-sm">Delete</button>
                    <button v-if="isEditingComment(comment.id)" @click="updateComment(news.id,index)" class="p-1 bg-orange-500 ml-2 rounded-sm text-white">Save</button>
                    <button v-else @click="editCommentId = comment.id" class="bg-orange-500 p-1 text-white rounded-sm ml-2">Edit</button>
                </div>
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
import CommentIcon from '@/components/icons/CommentIcon.vue'
import { useRouter } from 'vue-router'
let token = localStorage.getItem('token')
let titleValue = ref('')
let contentValue = ref('')
let newsArray = reactive([])
let commentValue = reactive([])
let editId = ref(null)
let editedContetnValue = reactive([])
let editedCommentValue = reactive([])
let editCommentId = ref(null)
let loginUserId = ref('')
let UserName = ref('')
let router = useRouter()
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
  try {
    let response = await axios.get('http://exam.tlancer.net/api/user', config)
    loginUserId.value = response.data.id
    UserName.value = response.data.name
  }catch(err){
    console.log(err);
  }

})

async function sendArticleRequest(){
    let response = await axios.post('http://exam.tlancer.net/api/news', {
        title: titleValue.value,
        content: contentValue.value
    }, config)
    console.log(response);
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
}

const isEditingComment = (id) => {
    return editCommentId.value === id
}

async function writeComment(newsId, index){
    console.log(commentValue[index]);
    let response = await axios.post('http://exam.tlancer.net/api/comments',{
        content: commentValue[index],
        news_id: newsId
    } ,config)
    console.log(response.data);
}
 
async function deletComment(id){
    let response = await axios.delete(`http://exam.tlancer.net/api/comments/${id}`, config)
    console.log(response);
}

async function updateComment(id,index){
    let response = await axios.put(`http://exam.tlancer.net/api/comments/${id}`, {
        content: editedCommentValue[index],
        news_id: id
    },config)
    console.log(response)
}

async function logOut(){
    localStorage.clear()
    router.push({ path: '/' })
    let response = await axios.post('http://exam.tlancer.net/api/logout', null , config)
}

</script>