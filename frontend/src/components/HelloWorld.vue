<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Learn more about IDE Support for Vue in the
    <a
      href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support"
      target="_blank"
      >Vue Docs Scaling up Guide</a
    >.
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
        <div class="p-10">
          <h1 class="text-4xl font-bold text-red-500">
            Tailwind is working 🚀
          </h1>
        </div>
        <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-4">

    <h1 class="text-5xl font-bold text-red-500">
      Red Text
    </h1>

    <p class="text-green-600 text-xl">
      Green paragraph text
    </p>

    <p class="text-purple-700 text-2xl font-semibold">
      Purple text with bigger size
    </p>

    <button class="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
      Tailwind Button
    </button>

  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
