<template>
    <div>
        <div v-if="isSended">
            <h1 class="text-[2rem] font-bold">Hãy kiểm tra email</h1>
            <p class=" mt-8 text-[0.9rem] leading-5 font-semibold">
                Chúng tôi đã gửi tin nhắn đến email của bạn . Nhấn vào link trong email để tạo mới mật khẩu của bạn
            </p>
            <p class=" mt-3 text-[0.9rem] leading-5 font-semibold">
                Nếu bạn chưa nhận được tin nhắn của chúng tôi .
                <span @click="verify" class="text-blue--light cursor-pointer">Nhấn vào đây</span> để gửi lại
            </p>
        </div>
        <form v-else method="post" @submit="verify">
            <h1 class="text-[2rem] font-bold">Quên mật khẩu</h1>

            <GroupInput placeholder="email" type="email" class="mt-8" name="email"
                @input="(e) => handleChangeInput('email', e)" :value="email">
            </GroupInput>
            <p class=" mt-2 text-[0.75rem] font-semibold">
                Nhập email vào đây để chúng tôi có thể xác minh và tạo mới mật khẩu cho bạn
            </p>


            <div v-show="errorMessage" class="bg-red opacity-80 px-4 py-6 mt-6 rounded-lg">
                <p class="text-white font-medium text-[0.8rem]">{{ errorMessage }}</p>
            </div>

            <CustomButton type="submit" variant="primary" class="w-full mt-8">Gửi</CustomButton>

            <p class="mt-5 font-semibold text-[0.9rem] text-center">
                Bạn đã có tài khoản?
                <NuxtLink :to="PAGE_ROUTER_LOGIN" class="text-blue--light">
                    Đăng nhập ngay
                </NuxtLink>
            </p>
        </form>
    </div>

</template>

<script>
import { PAGE_ROUTER_LOGIN } from "~/configs/page-router"

export default {
    layout: 'auth',
    data() {
        return {
            PAGE_ROUTER_LOGIN,
            errorMessage: "",
            email: "",
            isSended: false
        }
    },
    methods: {
        handleChangeInput(attr, e) {
            this[attr] = e.target.value
        },
        async verify(event) {
            event.preventDefault()

            try {
                const response = await this.$authApi.forgetPassword({
                    email: this.email
                })
                if (response.data) {
                    this.isSended = true
                }
            } catch (error) {
                this.errorMessage = error.message
            }
        },
    },
}
</script>

