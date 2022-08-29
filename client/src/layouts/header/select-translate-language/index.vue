<template>
    <div class="selected-none relative" v-click-outside="close">
        <div class="hover:bg-grey--light flex items-center p-2 space-x-2 rounded-lg cursor-pointer" @click="toggle">
            <img class="w-5 h-5" :src="require(`~/assets/images/${findInfoSelectedLanguage?.image}`)"
                :alt="findInfoSelectedLanguage?.alt"></img>

            <p class="font-bold text-[0.75rem]">{{ uppercaseCodeSelectedLanguage }}</p>

            <CaretDownSvg></CaretDownSvg>
        </div>

        <div class=" top-full absolute overflow-hidden bg-white rounded-lg shadow"
            :class="isDisplayed ? 'block' : 'hidden'">
            <div v-for="(info, index) in infoLanguages" :key="index">
                <div class="hover:bg-grey--light flex items-center px-4 py-2 space-x-2 cursor-pointer"
                    @click="changeLanguage(info.code)">
                    <div class=" w-11 flex items-center space-x-2">
                        <img class="w-5 h-5" :src="require(`~/assets/images/${info.image}`)" :alt="info.alt"></img>
                        <p class="font-bold text-[0.75rem]">{{ info.code.toUpperCase() }}</p>
                    </div>
                    <div v-show="codeSelectedLanguage === info.code" class="ml-10">
                        <StickSvg></StickSvg>
                    </div>
                </div>
                <div v-show="index !== infoLanguages.length - 1" class="bg-grey--light w-full h-px"></div>
            </div>
        </div>
    </div>

</template>


<script>
import CaretDownSvg from "~/assets/svgs/caret_down.svg?inline";
import StickSvg from "~/assets/svgs/stick.svg?inline";


export default {
    data() {
        return {
            isDisplayed: false,
            codeSelectedLanguage: "vi",
            infoLanguages: [
                {
                    code: "vi",
                    image: "lang_vi.png",
                    alt: "Language Vietnam"
                },
                {
                    code: "en",
                    image: "lang_en.png",
                    alt: "Language English"
                },
            ]
        }
    },
    methods: {
        close() {
            this.isDisplayed = false
        },
        toggle() {
            this.isDisplayed = !this.isDisplayed
        },
        changeLanguage(code) {
            this.codeSelectedLanguage = code
            this.toggle()
        },
    },
    computed: {
        uppercaseCodeSelectedLanguage() {
            return this.codeSelectedLanguage.toUpperCase()
        },
        findInfoSelectedLanguage() {
            return this.infoLanguages.find((info) => info.code === this.codeSelectedLanguage)
        },
    },
    components: {
        CaretDownSvg,
        StickSvg
    }
}
</script>
