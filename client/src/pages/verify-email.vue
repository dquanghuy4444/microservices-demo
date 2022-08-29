<template>
    <div>
        <div v-if="status === StatusCode.FAILURE">
            <h1 class="text-[2rem] font-bold">Xác thực Email</h1>
            <p class=" mt-8 text-[0.9rem] leading-5 font-semibold">
                Chúng tôi đã xác thực email của bạn .
                Nếu bạn chưa nhận được tin nhắn xác thực nào của chúng tôi,
                <span @click="resend" class="text-blue--light cursor-pointer">nhấn vào đây</span>
                để chúng tôi gửi lại tin nhắn xác thực cho bạn
            </p>
        </div>
        <div v-else>
            <h1 class="text-[2rem] font-bold">Xác thực Email thành công</h1>
            <p class=" mt-8 text-[0.9rem] leading-5 font-semibold">
                Email của bạn đã được xác thực thành công .
                <NuxtLink :to="PAGE_ROUTER_LOGIN" class="text-blue--light">Nhấn vào đây</NuxtLink> để đăng nhập
            </p>
        </div>
        <div v-show="errorMessage" class="bg-red opacity-80 px-4 py-6 mt-6 rounded-lg">
            <p class="text-white font-medium text-[0.8rem]">{{ errorMessage }}</p>
        </div>

    </div>

</template>

<script>
import { PAGE_ROUTER_LOGIN } from "~/configs/page-router"
import { StatusCode } from "~/const/status-code"

export default {
    layout: 'auth',
    data() {
        return {
            StatusCode,
            PAGE_ROUTER_LOGIN,
            status: StatusCode.FAILURE,
            errorMessage: ""
        }
    },
    mounted() {
        const { status, access_token } = this.$route.query
        if (!status) {
            return
        }

        this.status = status

        if (status === StatusCode.SUCCESS) {
            this.$storage.removeUniversal("verified-email")
        } else {
            const email = this.$storage.getUniversal("verified-email")
            if (!email) {
                this.$route.push(PAGE_ROUTER_LOGIN)
            }
        }
    },
    methods: {
        handleChangeInput(attr, e) {
            this[attr] = e.target.value
        },
        async resend() {
            try {
                const email = this.$storage.getUniversal("verified-email")
                if (!email) {
                    this.$router.push(PAGE_ROUTER_LOGIN)

                    throw new Error("Xác thực thất bại")
                }

                const response = await this.$userApi.verifyEmail({
                    email,
                })
                if (!response?.data) {
                    throw new Error("Xác thực thất bại")
                }

                this.$toast.success('Xác thực thành công')
            } catch (error) {
                this.errorMessage = error.message
            }
        },
    },
}
</script>

