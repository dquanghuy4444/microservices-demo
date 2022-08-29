<template>
    <form method="post" @submit="register">
        <h1 class="text-[2rem] font-bold">Đăng ký</h1>

        <GroupInput class="mt-8" label="Họ và tên" name="fullname" @input="(e) => handleChangeInput('fullname', e)"
            :value="fullname"></GroupInput>

        <GroupInput type="email" class="mt-5" label="Email" name="email" @input="(e) => handleChangeInput('email', e)"
            :value="email"></GroupInput>

        <GroupInput type="number" class="mt-5" label="Số điện thoại" name="phone_number"
            @input="(e) => handleChangeInput('phoneNumber', e)" :value="phoneNumber"></GroupInput>

        <GroupInput class="mt-5" label="Tên đăng nhập" name="username" @input="(e) => handleChangeInput('username', e)"
            :value="username"></GroupInput>

        <GroupInput pattern=".{8,}" type="password" placeholder="Trên 8 ký tự" class="mt-5" label="Mật khẩu"
            name="password" @input="(e) => handleChangeInput('password', e)" :value="password"></GroupInput>

        <GroupInput pattern=".{8,}" type="password" placeholder="Trên 8 ký tự" class="mt-5" label="Nhập lại mật khẩu"
            name="confirm-password" @input="(e) => handleChangeInput('confirmPassword', e)" :value="confirmPassword">
        </GroupInput>

        <div class=" flex items-start mt-6 space-x-2 cursor-pointer" @click="() => hasConfirmed = !hasConfirmed">
            <CustomCheckbox :checked="hasConfirmed"></CustomCheckbox>
            <p class="font-semibold text-[0.75rem]">
                Tạo tài khoản có nghĩa là bạn đồng ý với <span class="text-green">Điều khoản dịch vụ, Chính sách</span>
                và <span class="text-green">Quyền riêng tư</span> mặc định của chúng tôi.
            </p>
        </div>

        <div v-show="errorMessage" class="bg-red opacity-80 px-4 py-6 mt-6 rounded-lg">
            <p class="text-white font-medium text-[0.8rem]">{{ errorMessage }}</p>
        </div>

        <CustomButton variant="primary" class=" w-full mt-8">Tạo tài khoản</CustomButton>

        <p class="mt-5 font-semibold text-[0.9rem] text-center">
            Bạn đã có tài khoản?
            <NuxtLink :to="PAGE_ROUTER_LOGIN" class="text-blue--light">
                Đăng nhập ngay
            </NuxtLink>
        </p>
    </form>
</template>

<script>
import { PAGE_ROUTER_LOGIN, PAGE_ROUTER_VERIFY_EMAIL } from "~/configs/page-router"

export default {
    layout: 'auth',
    data() {
        return {
            errorMessage: "",
            PAGE_ROUTER_LOGIN,
            fullname: "",
            email: "",
            username: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            hasConfirmed: false
        }
    },
    methods: {
        handleChangeInput(attr, e) {
            this[attr] = e.target.value
        },
        async register(event) {
            event.preventDefault();

            if (!this.hasConfirmed) {
                alert("Must confirm policy")
                return
            }

            if (this.password != this.confirmPassword) {
                alert("Passwords do not match.")
                return
            }

            try {
                let response = await this.$authApi.register({
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    fullname: this.fullname,
                    phone_number: this.phoneNumber
                })
                if (!response?.data) {
                    throw new Error("Đăng kí thất bại")
                }

                response = await this.$userApi.verifyEmail({
                    email: this.email,
                })
                if (!response?.data) {
                    throw new Error("Đăng kí thất bại")
                }
                this.$storage.setUniversal("verified-email", this.email)

                this.$toast.success('Đăng ký thành công')
                this.$router.push(PAGE_ROUTER_VERIFY_EMAIL)

            } catch (error) {
                this.errorMessage = error.message
            }
        }
    },
}
</script>

