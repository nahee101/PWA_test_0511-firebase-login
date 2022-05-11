import Vue from 'vue';
import Vuex from 'vuex';
/* router */
import router from '@/router';

/* 초기화한 파이어베이스 import */
import '@/datasources/firebase';
import {
  getAuth,
  /* 이메일 회원 */
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  /* 구글 회원 */
  GoogleAuthProvider, 
  signInWithPopup
} from 'firebase/auth';

/* 파이어베이스 인증을 위한 객체 */
const auth = getAuth();



Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /* 사용자 정보를 담을 객체 */
    oUser: null
  },
  getters: {
    /* 사용자 객체 반환 */
    fnGetUser(state) {
      //사용자 객체 oUser
      return state.oUser;
    },

    /* 사용자 객체의 유무로 로그인 여부 판단 */
    fnGetAuthStatus(state) {
      return state.oUser != null;
    }
  },
  mutations: {
    fnSetUser(state, payload) {
      state.oUser = payload;
    }
  },
  actions: {
    /////* 이메일 */////
    /* 파이어베이스의 인증을 통해 이메일 회원 생성 및 저장 */
    fnRegisterUser({commit}, payload) {
      createUserWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
        .then((pUserInfo) => {
          // Signed in
          // 신규 회원 이메일 정보를 스토어에 저장
          commit('fnSetUser', {
            email: pUserInfo.user.email,
          });
          router.push('/main');
        })
        .catch((err) => {
          console.log(err.message);
        });
      },
      /* 파이어베이스의 인증을 이용해서 이메일 회원 로그인 */
    fnDoLogin({commit}, payload) {
      signInWithEmailAndPassword(auth, payload.pEmail, payload.pPassword)
      .then((pUserInfo) => {
        //Signed in
        commit('fnSetUser', {
          id: pUserInfo.user.uid,
          name: pUserInfo.user.displayName,
          email: pUserInfo.user.email,
          photoURL: pUserInfo.user.photoURL
        });
        router.push('/main');
      })
      .catch((err) => {
        console.log(err.message);
      });
    },

    /////* 구글 */////
    /* 구글 제공업체로 로그인 과정 처리 */
    fnDoGoogleLogin_Popup({commit}) {
      const oProvider = new GoogleAuthProvider();
      oProvider.addScope('profile');
      oProvider.addScope('email');

      signInWithPopup(auth, oProvider)
      .then((pUserInfo) => {
        commit('fnSetUser', {
          id: pUserInfo.user.uid,
          name: pUserInfo.user.displayName,
          email: pUserInfo.user.email,
          photoURL: pUserInfo.user.photoURL
        });
        router.push('/main');
      })
      .catch((err) => {
        console.log(err.message);
      })
    }
  },
  modules: {
  }
  })
