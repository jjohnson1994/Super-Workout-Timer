import Vue from 'vue'
import VueRouter from 'vue-router'
import Workouts from '../views/Workouts.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Workouts
  },
  {
    path: '/workout/:id/play',
    name: 'WorkoutPlayer',
    component: () => import(/* webpackChunkName: "workoutPlayer" */ '../views/WorkoutPlayer.vue')
  },
  {
    path: '/workout/:id/edit',
    name: 'WorkoutEditor',
    component: () => import(/* webpackChunkName: "workoutEditor" */ '../views/WorkoutEditor.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
