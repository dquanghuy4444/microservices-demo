<template>
    <button
        class="component-default-fontsize util-flex-center space-x-1 rounded-lg"
        :class="[renderClassByVariant, renderClassBySize]"
        @click="handleClick"
    >
        <slot></slot>
    </button>
</template>

<script>
export default {
    props: ["variant", "size"],
    computed: {
        renderClassByVariant() {
            if (this.variant === "primary") {
                return "bg-green text-white";
            }
            if (this.variant === "secondary") {
                return "bg-grey--lightsword";
            }
            if (this.variant === "transparent") {
                return "bg-transparent hover:bg-[rgba(255,255,255,0.3)]";
            }
            return "rgb(213 176 176 / 60%)";
        },
        renderClassBySize() {
            if (this.size === "medium") {
                return "px-[52px] h-[60px]";
            }
            if (this.size === "large") {
                return "px-[68px] h-[70px]";
            }
            return "px-8 h-[40px]";
        },
        renderPropClass() {
            return this.class || "";
        },
    },
        methods: {
        handleClick(e) {
            this.$emit("click", e)
        }
    }
};
</script>
