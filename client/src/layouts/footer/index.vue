<template>
    <footer class="w-full pt-12 pb-10 bg-black">
        <section class="component-main-section">
            <div
                class="laptop:flex-row laptop:space-y-0 flex flex-col justify-between space-y-8 text-white"
            >
                <div
                    class="laptop:flex-col laptop:justify-start laptop:items-start flex items-center justify-between"
                >
                    <NuxtLink to="/">
                        <LogoSvg />
                    </NuxtLink>

                    <div class="mt-[10px]">
                        <p class="component-default-fontsize w-[170px]">
                            Công ty Cổ phần Công nghệ và Đào tạo trực tuyến
                            HAMIA
                        </p>
                        <p class="component-default-fontsize mt-[22px]">
                            ©2022 englishplus.vn
                        </p>
                    </div>
                </div>

                <div
                    class="bg-grey--light opacity-10 laptop:hidden w-full h-px mt-10"
                ></div>

                <div class="laptop:space-x-12 flex justify-between">
                    <div>
                        <h5 class="font-extrabold uppercase">Khóa học</h5>

                        <nav class="mt-5">
                            <ul>
                                <li
                                    v-for="(router, index) in courseRouters"
                                    :key="index"
                                    :class="{ 'mt-[22px]': index !== 0 }"
                                    class="hover:text-grey"
                                >
                                    <NuxtLink :to="router.path">
                                        <p class="component-default-fontsize">
                                            {{ router.title }}
                                        </p>
                                    </NuxtLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <h5 class="font-extrabold uppercase">
                            Chính sách & quy định
                        </h5>

                        <nav class="mt-5">
                            <ul>
                                <li
                                    v-for="(router, index) in policyRouters"
                                    :key="index"
                                    :class="{ 'mt-[22px]': index !== 0 }"
                                    class="hover:text-grey"
                                >
                                    <NuxtLink :to="router.path">
                                        <p class="component-default-fontsize">
                                            {{ router.title }}
                                        </p>
                                    </NuxtLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div
                    class="bg-grey--light opacity-10 laptop:hidden w-full h-px mt-10"
                ></div>

                <div class="laptop:w-[300px]">
                    <h5 class="font-extrabold uppercase">Liên hệ</h5>

                    <div class="mt-5">
                        <div class="mb-[22px]">
                            <a
                                class="component-default-fontsize underline"
                                :href="'tel:' + hotline1"
                            >
                                <span>{{ hotline1 }}</span>
                            </a>
                            -
                            <a
                                class="component-default-fontsize underline"
                                :href="'tel:' + hotline2"
                            >
                                <span>{{ hotline2 }}</span>
                            </a>
                        </div>

                        <a
                            class="component-default-fontsize underline"
                            :href="'mailto:' + email"
                        >
                            <span>{{ email }}</span>
                        </a>

                        <p class="component-default-fontsize mt-[22px]">
                            VP Hà Nội: Tầng 3, Tòa nhà Paragon - C, Ngõ 86 phố
                            Duy Tân, P. Dịch Vọng, Q. Cầu Giấy, TP. Hà Nội
                        </p>
                        <p class="component-default-fontsize mt-[22px]">
                            VP Đà Nẵng: 457/61 Tôn Đức Thắng, Q. Liên Chiểu, TP
                            .Đà Nẵng
                        </p>
                        <p class="component-default-fontsize mt-[22px]">
                            VP Philippines: Elizabeth setion school, bf Resort
                            drive, bf Resort village, Las Pinas city, metro
                            Manila, Philippines
                        </p>
                    </div>
                </div>
            </div>
            <div class="bg-grey--light opacity-10 w-full h-px mt-10"></div>

            <div class="mt-7 util-flex-between">
                <img
                    src="~/assets/images/confirm.png"
                    alt="confirm"
                    class="h-auto"
                />

                <div class="flex space-x-4">
                    <a :href="youtube" target="_blank">
                        <LogoYoutubeSvg></LogoYoutubeSvg>
                    </a>
                    <a :href="facebook" target="_blank">
                        <LogoFacebookSvg></LogoFacebookSvg>
                    </a>
                    <a :href="zalo" target="_blank">
                        <LogoZaloSvg></LogoZaloSvg>
                    </a>
                </div>
            </div>
        </section>
    </footer>
</template>

<script>
import LogoSvg from "~/assets/svgs/logo.svg?inline";
import LogoYoutubeSvg from "~/assets/svgs/logo_youtube.svg?inline";
import LogoFacebookSvg from "~/assets/svgs/logo_facebook.svg?inline";
import LogoZaloSvg from "~/assets/svgs/logo_zalo.svg?inline";

import {
    CONFIG_EMAIL_COMPANY,
    CONFIG_HOTLINE_COMPANY_1,
    CONFIG_HOTLINE_COMPANY_2,
    CONFIG_YOUTUBE_COMPANY,
    CONFIG_ZALO_COMPANY,
    CONFIG_FACEBOOK_COMPANY,
} from "~/configs";

export default {
    data() {
        return {
            email: CONFIG_EMAIL_COMPANY,
            hotline1: CONFIG_HOTLINE_COMPANY_1,
            hotline2: CONFIG_HOTLINE_COMPANY_2,
            youtube: CONFIG_YOUTUBE_COMPANY,
            zalo: CONFIG_ZALO_COMPANY,
            facebook: CONFIG_FACEBOOK_COMPANY,
            courseRouters: [
                {
                    title: "Tiếng Anh cho bé",
                    path: "/",
                },
                {
                    title: "Tiếng Anh trung học",
                    path: "/check",
                },
                {
                    title: "Tiếng Anh đi làm",
                    path: "/courses",
                },
                {
                    title: "Tiếng Anh giao tiếp",
                    path: "/become-teacher",
                },
                {
                    title: "Tiếng Anh du học",
                    path: "/become-teacher",
                },
                {
                    title: "Tiếng Anh luyện thi",
                    path: "/become-teacher",
                },
            ],
            policyRouters: [
                {
                    title: "Chính sách bảo mật thông tin",
                    path: "/",
                },
                {
                    title: "Chính sách hoàn phí",
                    path: "/check",
                },
                {
                    title: "Quy định và hình thức thanh toán",
                    path: "/courses",
                },
                {
                    title: "Nội quy học tập",
                    path: "/become-teacher",
                },
            ],
        };
    },
    components: { LogoSvg, LogoYoutubeSvg, LogoFacebookSvg, LogoZaloSvg },
};
</script>
