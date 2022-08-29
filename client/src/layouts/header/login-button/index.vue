<template>
    <!-- <div class="selected-none relative" v-click-outside="close">
        <CustomButton variant="primary" @click="toggle">Đăng nhập</CustomButton>


        <form class="popup-shadow fixed tablet:absolute top-[60px] tablet:top-[52px] tablet:right-0 right-1/2 translate-x-1/2 tablet:translate-x-0 px-10 tablet:px-6 py-8 overflow-hidden bg-white rounded-lg"
            :class="isDisplayed ? 'block' : 'hidden'">
            <GroupInput type="email" label="Email" name="username"
                @input="(e) => handleChangeInput('username', e)" :value="username">
            </GroupInput>
            <GroupInput pattern=".{8,}" class="mt-5" label="Mật khẩu" @input="(e) => handleChangeInput('password', e)" name="password"
                type="password" :value="password">
            </GroupInput>

            <CustomButton class="w-full mt-4" variant="primary" type="submit">Đăng nhập</CustomButton>

            <p class="w-max mt-5 font-semibold text-[0.9rem]">
                Bạn chưa có tài khoản?
                <NuxtLink :to="PAGE_ROUTER_REGISTER" class="text-blue--light">
                    Đăng ký ngay
                </NuxtLink>
            </p>
        </form>
    </div> -->
    <CustomAnchor variant="primary" :to="PAGE_ROUTER_LOGIN">Đăng nhập</CustomAnchor>

</template>

<script>
import { PAGE_ROUTER_REGISTER, PAGE_ROUTER_LOGIN } from "~/configs/page-router"
import { toggleBodyScrollbar } from "~/utils"

export default {
    data() {
        return {
            PAGE_ROUTER_LOGIN,
            PAGE_ROUTER_REGISTER,
            isDisplayed: false,
            username: "",
            password: "",
        }
    },
    methods: {
        close() {
            this.isDisplayed = false
            toggleBodyScrollbar(this.isDisplayed)
        },
        toggle() {
            this.isDisplayed = !this.isDisplayed
            toggleBodyScrollbar(this.isDisplayed)
        },
        handleChangeInput(attr, e) {
            this[attr] = e.target.value
        },
        async login(event) {
            event.preventDefault();

            const response = await this.$authApi.login({ email: this.username, password: this.password })
            if (response.data) {
                this.$router.push("/")
            }
        }
    },
}
</script>


<style scoped>
.popup-shadow {
    box-shadow: -10px 12px 60px rgba(0, 0, 0, 0.25);
}
</style>

