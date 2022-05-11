<!-- 회원가입 -->
<template>
    <div>
        <h1>회원가입 페이지입니다</h1>
        <form @submit.prevent="fnRegisterUser">
            <label for="email">이메일 </label>
            <input type="text" v-model="sEmail">
            <br>
            <label for="password">비밀번호 </label>
            <input type="password" v-model="sPassword">

            <hr>

            <input type="submit" value="회원가입">
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
        fnRegisterUser() {
            this.$store.dispatch('fnRegisterUser', {
                pEmail: this.sEmail,
                pPassword: this.sPassword
            })
        }
    }
}
</script>