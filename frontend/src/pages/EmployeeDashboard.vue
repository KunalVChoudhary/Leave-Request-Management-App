<script setup>
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import { logoutUser } from "../services/api"

const router = useRouter()

const startDate = ref("")
const endDate = ref("")
const reason = ref("")
const leaves = ref([])

const API = import.meta.env.VITE_API_URL

const fetchLeaves = async () => {
  const res = await fetch(`${API}/api/leave/my`, {
    credentials: "include"
  })
  const data = await res.json()
  if (res.ok) {
    leaves.value = data
  }
}

const applyLeave = async () => {
  const res = await fetch(`${API}/api/leave`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      startDate: startDate.value,
      endDate: endDate.value,
      reason: reason.value
    })
  })

  const data = await res.json()

  if (res.ok) {
    startDate.value = ""
    endDate.value = ""
    reason.value = ""
    fetchLeaves()
  } else {
    alert(data.message)
  }
}

const withdrawLeave = async (id) => {
  await fetch(`${API}/api/leave/${id}`, {
    method: "DELETE",
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
    <div class="max-w-6xl mx-auto mb-12">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-black text-gray-900 tracking-tight">Leave Management</h1>
          <p class="text-gray-600 mt-2 font-light">Apply for leave and track your requests</p>
        </div>
        <button
          @click="handleLogout"
          class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-xl
                 hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-4 focus:ring-red-500/20
                 shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap"
        >
          Sign out
        </button>
      </div>
    </div>

    <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
      <!-- Apply Leave Card -->
      <div class="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-2xl lg:col-span-1">
        <h2 class="text-2xl font-bold text-gray-900 mb-8">Apply for Leave</h2>
        <form @submit.prevent="applyLeave" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Start Date</label>
            <input
              v-model="startDate"
              type="date"
              required
              class="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900
                     focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent
                     transition-all duration-200 shadow-sm"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">End Date</label>
            <input
              v-model="endDate"
              type="date"
              required
              class="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900
                     focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent
                     transition-all duration-200 shadow-sm"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">Reason</label>
            <input
              v-model="reason"
              required
              class="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400
                     focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent
                     transition-all duration-200 shadow-sm"
              placeholder="Enter reason for leave"
            />
          </div>
          
          <button
            type="submit"
            class="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl
                   hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/20
                   shadow-xl hover:shadow-2xl transition-all duration-200"
          >
            Submit Leave Request
          </button>
        </form>
      </div>

      <!-- Leaves Table Card -->
      <div class="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-8 shadow-2xl lg:col-span-1">
        <h2 class="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          My Leave Requests
          <span class="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
            {{ leaves.length }}
          </span>
        </h2>
        
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead>
              <tr class="bg-gradient-to-r from-gray-50 to-gray-100">
                <th class="text-left p-4 font-semibold text-gray-700 rounded-l-2xl">Start</th>
                <th class="text-left p-4 font-semibold text-gray-700">End</th>
                <th class="text-left p-4 font-semibold text-gray-700">Reason</th>
                <th class="text-left p-4 font-semibold text-gray-700">Status</th>
                <th class="text-right p-4 font-semibold text-gray-700 rounded-r-2xl">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="leave in leaves" :key="leave._id" class="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td class="p-4 font-medium text-gray-900">
                  {{ leave.startDate.slice(0,10) }}
                </td>
                <td class="p-4 text-gray-700">
                  {{ leave.endDate.slice(0,10) }}
                </td>
                <td class="p-4 text-gray-700 max-w-xs truncate">
                  {{ leave.reason }}
                </td>
                <td class="p-4">
                  <span 
                    :class="{
                      'bg-green-100 text-green-800': leave.status === 'approved',
                      'bg-yellow-100 text-yellow-800': leave.status === 'pending',
                      'bg-red-100 text-red-800': leave.status === 'rejected'
                    }"
                    class="px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {{ leave.status }}
                  </span>
                </td>
                <td class="p-4">
                  <button
                    v-if="leave.status === 'pending'"
                    @click="withdrawLeave(leave._id)"
                    class="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold
                           hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-400
                           shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    Withdraw
                  </button>
                </td>
              </tr>
              <tr v-if="leaves.length === 0">
                <td colspan="5" class="p-12 text-center text-gray-500 font-medium">
                  No leave requests yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
