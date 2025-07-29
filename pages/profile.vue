<template>
  <div class="profile-page">
    <h1>User Profile</h1>

    <div v-if="loading">Loading profile…</div>

    <div v-else>
      <p><strong>Name:</strong> {{ user.name }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <button @click="LogoutUser">Logout</button>

      <div class="debug">
        <h3>Current user object:</h3>
        <pre>{{ user }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'

const user = reactive({ name: '', email: '' })
const loading = ref(true)

onMounted(async () => {
  await fetchUser()
  loading.value = false
})

const LogoutUser = async () => {
  await authClient.signOut()

  window.location.reload()
}

async function fetchUser() {
  const data = await $fetch('/api/get-user')
  Object.assign(user, data.data[0])
}
</script>

<style scoped>
.profile-page {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
input {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  font-size: 16px;
}
button {
  margin-right: 8px;
  padding: 8px 16px;
  font-size: 16px;
}
.debug {
  margin-top: 20px;
  background: #f5f5f5;
  padding: 10px;
}
</style>
