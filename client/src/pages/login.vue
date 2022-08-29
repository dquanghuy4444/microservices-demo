<template>
    <form method="post" @submit="login">

        <h1 class="text-[2rem] font-bold">Đăng nhập</h1>
        <group-input class="mt-8" label="Tên đăng nhập" name="username" @input="(e) => handleChangeInput('username', e)"
            :value="username"></group-input>

        <div class="relative mt-5">
            <GroupInput pattern=".{8,}" type="password" placeholder="Trên 8 ký tự" label="Mật khẩu" name="password"
                @input="(e) => handleChangeInput('password', e)" :value="password"></GroupInput>
            <NuxtLink :to="PAGE_ROUTER_FORGET_PASSWORD"
                class="absolute right-0 top-0 font-semibold text-[0.8rem] text-blue--light">
                Quên mật khẩu
            </NuxtLink>
        </div>

        <div v-show="errorMessage" class="bg-red opacity-80 px-4 py-6 mt-6 rounded-lg">
            <p class="text-white font-medium text-[0.8rem]">{{ errorMessage }}</p>
        </div>

        <CustomButton type="submit" variant="primary" class=" w-full mt-8">Đăng nhập</CustomButton>

        <p class="text-center mt-5 font-semibold text-[0.9rem]">
            Bạn chưa có tài khoản?
            <NuxtLink :to="PAGE_ROUTER_REGISTER" class="text-blue--light">
                Đăng ký ngay
            </NuxtLink>
        </p>
    </form>
</template>

<script>
import { PAGE_ROUTER_REGISTER, PAGE_ROUTER_FORGET_PASSWORD } from "~/configs/page-router"
import { StatusCode } from "~/const/status-code"

export default {
    layout: 'auth',
    data() {
        return {
            errorMessage: "",
            PAGE_ROUTER_FORGET_PASSWORD,
            PAGE_ROUTER_REGISTER,
            rememberMe: false,
            username: "",
            password: "",
        }
    },
    methods: {
        handleChangeInput(attr, e) {
            this[attr] = e.target.value
        },
        async login(event) {
            event.preventDefault();
            try {
                const response = await this.$authApi.login({ username: this.username, password: this.password })
                if (response.data) {
                    this.$storage.setUniversal("token", response.data.access_token)
                    this.$storage.setUniversal("user-info", response.data.user)
                    this.$router.push("/")
                }
            } catch (error) {
                if (error.code === StatusCode.EMAIL_NOT_VERIFY) {
                    this.$router.push("/")
                    return
                }
                this.errorMessage = error.message
            }
        }
    },
}
</script>


