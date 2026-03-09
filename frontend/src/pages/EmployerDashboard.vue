<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { logoutUser } from "../services/api"

const router = useRouter()
const leaves = ref([])
const loading = ref(false)

const API = import.meta.env.VITE_API_URL

const fetchLeaves = async () => {
  loading.value = true
  try {
    const res = await fetch(`${API}/api/leave`, {
      credentials: "include"
    })
    const data = await res.json()
    if (res.ok) {
      leaves.value = data
    }
  } finally {
    loading.value = false
  }
}

const approveLeave = async (id) => {
  await fetch(`${API}/api/leave/${id}/approve`, {
    method: "PATCH",
    credentials: "include"
  })
  fetchLeaves()
}

const rejectLeave = async (id) => {
  await fetch(`${API}/api/leave/${id}/reject`, {
    method: "PATCH",
    credentials: "include"
  })
  fetchLeaves()
}

const handleLogout = async () => {
  await logoutUser()
  router.push("/")
}

onMounted(() => {
  fetchLeaves()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-white p-8">
    <!-- Header -->
    <div class="max-w-7xl mx-auto mb-12">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-black text-gray-900 tracking-tight">Leave Approvals</h1>
          <p class="text-gray-600 mt-2 font-light">Review and manage employee leave requests</p>
        </div>
        <button
          @click="handleLogout"
          :disabled="loading"
          class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl
                 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20
                 shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap disabled:opacity-50"
        >
          Sign out
        </button>
      </div>
    </div>

    <!-- Leaves Table Card -->
    <div class="max-w-7xl mx-auto">
      <div class="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-2xl">
        <div class="flex items-center justify-between mb-8">
          <h2 class="text-2xl font-bold text-gray-900 flex items-center gap-3">
            Employee Leave Requests
            <span class="text-sm bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
              {{ leaves.filter(l => l.status === 'pending').length }} pending
            </span>
          </h2>
          <div class="text-sm text-gray-500">
            Last updated: {{ new Date().toLocaleString() }}
          </div>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
                <th class="text-left p-5 font-semibold text-gray-700 rounded-l-3xl">Employee</th>
                <th class="text-left p-5 font-semibold text-gray-700">Email</th>
                <th class="text-left p-4 font-semibold text-gray-700">Type</th>
                <th class="text-left p-4 font-semibold text-gray-700">Start</th>
                <th class="text-left p-4 font-semibold text-gray-700">End</th>
                <th class="text-left p-4 font-semibold text-gray-700">Reason</th>
                <th class="text-left p-4 font-semibold text-gray-700">Status</th>
                <th class="text-right p-5 font-semibold text-gray-700 rounded-r-3xl">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="leave in leaves" 
                :key="leave._id" 
                class="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200"
              >
                <td class="p-5 font-semibold text-gray-900">
                  {{ leave.employee?.username || 'N/A' }}
                </td>
                <td class="p-5 text-gray-700">
                  {{ leave.employee?.email || 'N/A' }}
                </td>
                <td class="p-4 text-gray-700">
                  {{ leave.leaveType || 'Standard' }}
                </td>
                <td class="p-4 font-medium text-gray-900">
                  {{ leave.startDate.slice(0,10) }}
                </td>
                <td class="p-4 text-gray-700">
                  {{ leave.endDate.slice(0,10) }}
                </td>
                <td class="p-4 text-gray-700 max-w-md truncate" :title="leave.reason">
                  {{ leave.reason }}
                </td>
                <td class="p-4">
                  <span 
                    :class="{
                      'bg-green-100 text-green-800': leave.status === 'approved',
                      'bg-yellow-100 text-yellow-800': leave.status === 'pending',
                      'bg-red-100 text-red-800': leave.status === 'rejected'
                    }"
                    class="px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {{ leave.status }}
                  </span>
                </td>
                <td class="p-5">
                  <div v-if="leave.status === 'pending'" class="flex gap-2 justify-end">
                    <button
                      @click="approveLeave(leave._id)"
                      class="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold
                             hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-400/20
                             shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Approve
                    </button>
                    <button
                      @click="rejectLeave(leave._id)"
                      class="bg-gradient-to-r from-red-500 to-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold
                             hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-400/20
                             shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      Reject
                    </button>
                  </div>
                  <span v-else class="text-sm text-gray-500">No action needed</span>
                </td>
              </tr>
              <tr v-if="leaves.length === 0">
                <td colspan="8" class="p-16 text-center text-gray-500 font-medium">
                  No leave requests to review
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
