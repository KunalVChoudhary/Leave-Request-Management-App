<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { loginUser, checkAuth } from "../services/api"

const email = ref("")
const password = ref("")
const router = useRouter()
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  try {
    const res = await loginUser({
      email: email.value,
      password: password.value
    })

    if (res.ok) {
      const auth = await checkAuth()
      const user = await auth.json()

      if (user.role === "employer") {
        router.push("/employer")
      } else {
        router.push("/employee")
      }
    } else {
      alert("Invalid credentials")
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="h-[600px] flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-white">
    <div class="w-full max-w-md">
      <!-- Logo/Brand -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-black text-gray-900 tracking-tight">Leave App</h1>
        <p class="text-sm text-gray-500 mt-2 font-light">Sign in to your account</p>
      </div>

      <!-- Form Card -->
      <div class="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 shadow-xl">
        <form @submit.prevent="handleLogin" class="space-y-6">
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
            class="w-full h-12 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl font-semibold
                   hover:from-gray-800 hover:to-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-900/20
                   disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl
                   flex items-center justify-center gap-2"
          >
            <span v-if="!loading">Sign in</span>
            <span v-else>Signing in...</span>
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-gray-100 text-center">
          <p class="text-xs text-gray-500">
            Don't have an account?
            <router-link to="/signup" class="text-gray-900 font-semibold hover:underline ml-1">
              Create account
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
