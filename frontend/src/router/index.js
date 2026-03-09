import { createRouter, createWebHistory } from "vue-router"

import Login from "../pages/Login.vue"
import Signup from "../pages/Signup.vue"
import EmployeeDashboard from "../pages/EmployeeDashboard.vue"
import EmployerDashboard from "../pages/EmployerDashboard.vue"

import { checkAuth } from "../services/api"

const routes = [
  { path: "/", component: Login, meta: { guestOnly: true } },

  { path: "/signup", component: Signup, meta: { guestOnly: true } },

  {
    path: "/employee",
    component: EmployeeDashboard,
    meta: { requiresAuth: true, role: "employee" }
  },

  {
    path: "/employer",
    component: EmployerDashboard,
    meta: { requiresAuth: true, role: "employer" }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {

  const res = await checkAuth()

  if (res.ok) {

    const user = await res.json()

    if (to.meta.guestOnly) {
      return next(user.role === "employer" ? "/employer" : "/employee")
    }

    if (to.meta.role && to.meta.role !== user.role) {
      return next(user.role === "employer" ? "/employer" : "/employee")
    }

    return next()
  }

  if (to.meta.requiresAuth) {
    return next("/")
  }

  next()
})

export default router