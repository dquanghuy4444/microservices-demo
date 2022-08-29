<template>
    <header class="h-[54px] bg-white header-shadow mb-8 relative">
        <section class="component-main-section flex items-center h-full">
            <NuxtLink class="tablet:space-x-1 flex items-center" to="/">
                <LogoColorSvg></LogoColorSvg>
                <BrandText class="tablet:block hidden font-extrabold"></BrandText>
            </NuxtLink>

            <div class="h-7 min-w-px bg-grey--light laptop:block hidden ml-10 mr-4"></div>

            <nav class="laptop:block hidden">
                <ul class="flex items-center">
                    <li v-for="(router, index) in routers" :key="index" class="laptop:px-4 group relative">
                        <div v-if="router?.extraRouters"
                            class="text-grey group-hover:text-green flex items-center py-3 cursor-pointer">
                            <p class="component-default-fontsize ">
                                {{ router.title }}
                            </p>
                            <CaretDownDropSvg></CaretDownDropSvg>
                        </div>
                        <NuxtLink v-else :to="router.path"
                            class="text-grey component-default-fontsize group-hover:text-green">
                            <p class="py-3">
                                {{ router.title }}
                            </p>
                        </NuxtLink>


                        <nav v-if="router?.extraRouters"
                            class="group-hover:block top-full -left-1/2 absolute hidden w-auto">
                            <ul class="rounded-2xl box-shadow w-max grid grid-cols-2 p-6 mt-4 bg-white">
                                <li v-for="(router, index) in router.extraRouters" :key="index">
                                    <NuxtLink :to="router.path"
                                        class="hover:bg-grey--light flex items-center p-4 space-x-3 rounded-lg">
                                        <div class="util-flex-center bg-[#f6f1f1c9] w-[52px] h-[52px] rounded-lg">
                                            <div v-html="require(`assets/svgs/${router.icon}.svg?raw`)"></div>
                                        </div>
                                        <div>
                                            <p class="text-[1.1rem] font-semibold text-black">{{ router.title }}</p>
                                            <span class="text-[0.75rem] text-[#777D7E] font-medium">{{
                                                    router.description
                                            }}</span>
                                        </div>
                                    </NuxtLink>

                                </li>
                            </ul>
                        </nav>
                    </li>
                </ul>
            </nav>

            <div class="flex items-center ml-auto">
                <SelectTranslateLanguage></SelectTranslateLanguage>

                <div class="w-[200px] laptop:block hidden relative ml-5">
                    <div class="top-1/2 left-2 absolute -translate-y-1/2">
                        <LoupSearchSvg></LoupSearchSvg>
                    </div>
                    <input class="bg-grey--light rounded-lg text-[0.8rem] font-medium py-3 outline-none pl-10 w-full"
                        placeholder="Tìm kiếm..."></input>
                </div>

                <div v-if="userInfo" class="flex ml-3">
                    <div class="bg-grey--light w-9 h-9 util-flex-center flex-1 overflow-hidden rounded-full cursor-pointer">
                        <img v-if="userInfo?.avatar" :src="userInfo.avatar" class="object-fit w-full h-full"
                            alt="avatar"></img>

                        <UserSvg v-else></UserSvg>

                    </div>
                </div>
                <LoginButton v-else class="ml-3"></LoginButton>

                <div @click="toggle" class="laptop:hidden block ml-5 cursor-pointer">
                    <HumburgerNavSvg v-show="!isDropBarDisplayed"></HumburgerNavSvg>
                    <CloseDropBarSvg v-show="isDropBarDisplayed"></CloseDropBarSvg>
                </div>
            </div>
        </section>

        <section class="bg-white top-[80px] absolute left-0 w-full h-[calc(100vh-80px)] z-50"
            :class="isDropBarDisplayed ? 'block' : 'hidden'">
        </section>
    </header>
</template>

<script>
import LogoColorSvg from "~/assets/svgs/logo_color.svg?inline";
import HumburgerNavSvg from "~/assets/svgs/humburger_nav.svg?inline";
import LoupSearchSvg from "~/assets/svgs/loup_search.svg?inline";
import CloseDropBarSvg from "~/assets/svgs/close_drop_bar.svg?inline";
import CaretDownDropSvg from "~/assets/svgs/caret_down_drop.svg?inline";
import UserSvg from "~/assets/svgs/user.svg?inline";

import SelectTranslateLanguage from "./select-translate-language/index.vue";
import LoginButton from "./login-button/index.vue";

import { toggleBodyScrollbar } from "~/utils"

export default {
    data() {
        return {
            isDropBarDisplayed: false,
            routers: [
                {
                    title: "Kiểm tra IELTS",
                    path: "/check",
                },
                {
                    title: "Khóa học",
                    extraRouters: [
                        {
                            title: "Tiếng anh cho bé",
                            description: "Nulla Lorem mollit cupidatat irure.",
                            icon: "icon_dropbar_for_kid",
                            path: "/check",
                        },
                        {
                            title: "Tiếng anh cho giao tiếp",
                            description: "Nulla Lorem mollit cupidatat irure.",
                            icon: "icon_dropbar_for_communicate",
                            path: "/check",
                        },
                        {
                            title: "Tiếng anh cho trung học",
                            description: "Nulla Lorem mollit cupidatat irure.",
                            icon: "icon_dropbar_for_highschool",
                            path: "/check",
                        },
                        {
                            title: "Tiếng anh cho du học",
                            description: "Nulla Lorem mollit cupidatat irure.",
                            icon: "icon_dropbar_for_study_aboard",
                            path: "/check",
                        },
                        {
                            title: "Tiếng anh cho đi làm",
                            description: "Nulla Lorem mollit cupidatat irure.",
                            icon: "icon_dropbar_for_worker",
                            path: "/check",
                        },
                        {
                            title: "Tiếng anh cho luyện thi",
                            description: "Nulla Lorem mollit cupidatat irure.",
                            icon: "icon_dropbar_for_practice_exam",
                            path: "/check",
                        },
                    ]
                },
                {
                    title: "Trở thành giáo viên",
                    path: "/become-teacher",
                },
            ],
            userInfo: null
        };
    },

    mounted() {
        const userInfo = this.$storage.getUniversal("user-info")
        if (userInfo) {
            this.userInfo = userInfo
        }
    },
    methods: {
        toggle() {
            this.isDropBarDisplayed = !this.isDropBarDisplayed
            toggleBodyScrollbar(this.isDropBarDisplayed)
        }
    },
    components: {
        CaretDownDropSvg,
        CloseDropBarSvg,
        LogoColorSvg,
        HumburgerNavSvg,
        LoupSearchSvg,
        SelectTranslateLanguage,
        LoginButton,
        UserSvg
    },
};
</script>

<style scoped>
.header-shadow {
    box-shadow: 0px 14px 26px rgba(0, 0, 0, 0.05);
}

.box-shadow {
    box-shadow: 0px 0px 26px rgba(0, 0, 0, 0.12);
}

a.nuxt-link-exact-active {
    color: var(--color-green) !important;
}
</style>
