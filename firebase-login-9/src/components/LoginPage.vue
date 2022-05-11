<!-- 이메일 로그인 -->
<template>
    <div>
        <h1>로그인 페이지입니다</h1>
        <form @submit.prevent="fnDoLogin">
            <label for="email">이메일 </label>
            <input type="text" v-model="sEmail">
            <br>
            <label for="password">비밀번호 </label>
            <input type="password" v-model="sPassword">

            <hr>

            <input type="submit" value="로그인">
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            sEmail: '',
            sPassword: ''
        }
    },
    methods: {
        fnDoLogin() {
            this.$store.dispatch('fnDoLogin', {
            pEmail: this.sEmail,
            pPassword: this.sPassword
            })
        }
    }
}
</script>