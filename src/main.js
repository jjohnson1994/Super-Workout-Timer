import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css'
import router from './router'

import workout1 from './helpers/ExampleWorkouts';

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

function initLocalStorageItems() {
  const newWorkouts = [workout1];
  window.localStorage.setItem('workouts', JSON.stringify(newWorkouts));
}

const savedWorkouts = JSON.parse(window.localStorage.getItem('workouts'));

if (!savedWorkouts || savedWorkouts.length === 0) {
  initLocalStorageItems();
}
