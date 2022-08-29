<template>
    <div>
        <div v-if="isSended">
            <h1 class="text-[2rem] font-bold">Mật khẩu đã được thay đổi</h1>
            <p class=" mt-8 text-[0.9rem] leading-5 font-semibold">
                Chúng tôi đã thay đổi mật khẩu mới cho bạn .
                <NuxtLink :to="PAGE_ROUTER_LOGIN" class="text-blue--light">Nhấn vào đây</NuxtLink> để đăng nhập
            </p>
        </div>
        <form v-else method="post" @submit="verify">
            <h1 class="text-[2rem] font-bold">Nhập mật khẩu mới</h1>

            <GroupInput type="password" placeholder="Mật khẩu" class="mt-8" name="new_password"
                @input="(e) => handleChangeInput('newPassword', e)" :value="newPassword">
            </GroupInput>

            <p class="mt-2 text-[0.75rem] font-semibold">
                Nhập mật khẩu mới vào đây để chúng tôi có thể thay đổi cho bạn
            </p>

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
    created() {
        const token = this.$route.query.token
        if (token) {
            this.$storage.setUniversal("token", token)
            return
        }
        this.$router.push(PAGE_ROUTER_LOGIN)
    },
    data() {
        return {
            PAGE_ROUTER_LOGIN,
            newPassword: "",
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
                const response = await this.$authApi.resetPassword({
                    new_password: this.newPassword
                })
                if (response.data) {
                    this.isSended = true
                }
            } catch (error) {
                this.$toast.error(error.message)
            }
        },
    },
}
</script>


