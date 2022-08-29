<template>
    <NuxtLink
        :to="to"
        class="component-default-fontsize util-flex-center space-x-1 rounded-lg"
        :class="[renderClassByVariant, renderClassBySize]"
    >
        <slot></slot>
    </NuxtLink>
</template>

<script>
export default {
    props: ["variant", "to", "size"],
    computed: {
        renderClassByVariant() {
            if (this.variant === "primary") {
                return "bg-green text-white";
            }
            if (this.variant === "secondary") {
                return "bg-grey--lightsword text-black";
            }
            if (this.variant === "transparent") {
                return "bg-transparent hover:bg-[rgba(255,255,255,0.3)]";
            }
            return "bg-white/[0.3]";
        },
        renderClassBySize() {
            if (this.size === "medium") {
                return "px-[52px] h-[60px]";
            }
            if (this.size === "large") {
                return "px-[68px] h-[70px]";
            }
            return "px-7 h-[40px]";
        },
    },
};
</script>
