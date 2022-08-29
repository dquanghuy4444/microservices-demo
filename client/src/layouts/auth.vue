<template>
    <div class="flex w-screen h-screen">
        <div
            class="bg-first-auth !bg-[center_top_-0.5rem] laptop:!bg-[center_top_-2rem] util-fit-background flex-1 relative">
            <div class="top-1/2 left-1/2 tablet:w-1/2 absolute w-2/3 -translate-x-1/2 -translate-y-1/2">
                <Nuxt />
            </div>
        </div>
        <div class="bg-blue bg-auth util-fit-background laptop:block relative hidden w-[42%]">
            <div class="text-[2.5rem] font-bold absolute top-1/3 left-12">
                <p class=" w-[320px] text-white">Tìm khóa học phù hợp với</p>
                <p class="text-green">kỹ năng của bạn</p>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    middleware: "auth"
}
</script>

<style scoped>
.bg-auth {
    background-image: url("~assets/images/bg_auth.png");
}

.bg-first-auth {
    background-image: url("~assets/images/bg_first_auth.png");
}
</style>
