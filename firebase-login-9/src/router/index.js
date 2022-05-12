import Vue from 'vue';
import VueRouter from 'vue-router';
/* 네비게이션 가드 사용 */
import '@/datasources/firebase'
import {getAuth} from 'firebase/auth';
const auth = getAuth();

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'start',
    component: function () {
      return import('../components/StartPage.vue')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import('../components/LoginPage.vue')
    }
  },
  {
    path: '/register',
    name: 'register',
    component: function () {
      return import('../components/RegisterPage.vue')
    }
  },
  {
    path: '/main',
    name: 'main',
    component: function () {
      return import('../components/MainPage.vue')
    },
    //네비게이션 가드를 사용하기 위함
    meta: {bAuth: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

  /////* 네비게이션 가드 */////
  /* main에 접근했을 때, 로그인이 되어 있다면 main 페이지로
  로그인이 되어 있지 않다면, login 페이지로 이동할 수 있도록 네비게이션 가드를 사용 */
  //route meta 필드를 확인 -> main 페이지에 접근한 것을 확인한다
  router.beforeEach((to, from, next) => {
    //to: 이동할 URL 정보가 담긴 라우터 객체
    //from: 현재 URL 정보가 담긴 라우터 객체
    //next: to에서 지정한 URL로 이동하기 위해 반드시 호출해야 하는 함수

    //이동할 위치(to-라우터 객체)가 main인지 확인  
    const bNeedAuth = to.matched.some((record) => record.meta.bAuth);
    //로그인이 되어 있는지 확인: firebase 인증 필요
    const bCheckAuth = auth.currentUser;
    
    console.log(bNeedAuth);
    //main에 접근하려고 하는데 로그인이 되어 있지 않은 경우 > login 페이지로 이동
    //그외: 다른 페이지로 이동, 로그인이 되어 있으면서 main으로 이동하려는 경우 -> 정상 이동
    //next 사용
    if(bNeedAuth && !bCheckAuth) {
      next('/login'); //next를 사용해서 /login으로 이동
    } else {
      next();
    }
  });

export default router
