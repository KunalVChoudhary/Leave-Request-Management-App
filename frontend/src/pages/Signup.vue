<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { registerUser } from "../services/api"

const username = ref("")
const email = ref("")
const password = ref("")
const router = useRouter()
const loading = ref(false)

const handleSignup = async () => {
  loading.value = true
  try {
    const res = await registerUser({
      username: username.value,
      email: email.value,
      password: password.value
    })

    const data = await res.json()

    if (res.ok) {
      router.push("/")
    } else {
      alert(data.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="h-[700px] flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-white">
    <div class="w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-black text-gray-900 tracking-tight">Leave App</h1>
        <p class="text-sm text-gray-500 mt-2 font-light">Create your account</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 shadow-xl">
        <form @submit.prevent="handleSignup" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              v-model="username"
              required
              :disabled="loading"
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              placeholder="Your username"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              required
              :disabled="loading"
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              required
              :disabled="loading"
              class="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent
                     disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-semibold
                   hover:from-emerald-700 hover:to-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/20
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl
                   flex items-center justify-center gap-2"
          >
            <span v-if="!loading">Create account</span>
            <span v-else>Creating account...</span>
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-gray-100 text-center">
          <p class="text-xs text-gray-500">
            Already have an account?
            <router-link to="/" class="text-gray-900 font-semibold hover:underline ml-1">
              Sign in
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>