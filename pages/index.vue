<template>
  <div class="auth-container">
    <h2>{{ modeLabel }}</h2>
    <form @submit.prevent="submit">
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Password" required />
      <template v-if="mode === 'signup'">
        <input v-model="form.firstName" type="text" placeholder="First name" required />
        <input v-model="form.lastName" type="text" placeholder="Last name" required />
      </template>
      <button type="submit">{{ modeLabel }}</button>
    </form>
    <p>
      <a @click="toggleMode" href="#">
        {{ mode === 'login' ? "Don't have account? Sign Up" : "Already have account? Log In" }}
      </a>
    </p>
    <div v-if="submitted">
      <h3>Submitted Data:</h3>
      <pre>{{ form }}</pre>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, computed } from 'vue'

const mode = ref('signup')
const submitted = ref(false)
const form = reactive({
  email: '',
  password: '',
  firstName: '',
  lastName: ''
})

const modeLabel = computed(() =>
  mode.value === 'login' ? 'Login' : 'Sign Up'
)

function toggleMode() {
  submitted.value = false
  mode.value = mode.value === 'login' ? 'signup' : 'login'
}


const UserSignUp = async (name,email, password) => {
  await authClient.signUp.email({
    email: email,
    password: password,
    name: name
  },
      {
        onRequest: () => {
          console.log("login processing");
        },
        onSuccess: async () => {
          console.log("login succes");

          console.log("redirecting");

          alert("signup")


        },
        onError: (ctx) => {
          console.log("login error", ctx);

          alert(ctx.error.message);
        },
      }

)

};


const loginWithEmail = async (email, password) => {
  await authClient.signIn.email({
    email:email,
    password: password,
  },
      {
        onRequest: () => {
          console.log("login processing");
        },
        onSuccess: async () => {
          console.log("login succes");

          console.log("redirecting");

          alert("login")

        },
        onError: (ctx) => {

          alert(ctx.error.message);
        },
      }

)

};


async function submit() {
  submitted.value = true
  const formData  = JSON.parse(JSON.stringify(form))

  console.log('Form submitted:', formData)

  if (mode.value === 'login') {
    await loginWithEmail(formData.email,formData.password)
  }else{
    await UserSignUp(`${formData.firstName} ${formData.lastName}`,formData.email,formData.password)
  }

  // Here you'd call your API, e.g.:
  // await $fetch('/api/auth/' + mode.value, { method: 'POST', body: form })
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 60px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
}
input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  font-size: 16px;
  box-sizing: border-box;
}
button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  background: #007acc;
  color: white;
  border: none;
  cursor: pointer;
  margin-bottom: 12px;
}
button:hover { background: #005fa3; }
a {
  color: #007acc;
  cursor: pointer;
  text-decoration: underline;
}
pre {
  background: #f5f5f5;
  padding: 10px;
  overflow-x: auto;
}
</style>
