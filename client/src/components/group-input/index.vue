<template>
    <div class="flex flex-col">
        <label class="font-semibold text-[0.8rem]" :for="name">{{ label }} <span class="text-red"
                v-show="isRequired && label">*</span></label>
        <input :pattern="pattern" :required="isRequired" :placeholder="placeholder"
            class="border-1 border-grey--light text-[0.8rem] font-medium py-3 pl-4 mt-1 border rounded-lg outline-none"
            :type="type" :id="name" :name="name" :value="value" @input="handleChange" />
    </div>
</template>

<script>
export default {
    props: {
        name: String,
        placeholder: String,
        label: String,
        value: String,
        isRequired: {
            type: Boolean,
            default: true,
        },
        type: {
            type: String,
            default: "text",
        },
        pattern: {
            type: String,
            default: ".{1,}",
        },
    },
    methods: {
        handleChange(e) {
            this.$emit("input", e)
        }
    }
}
</script>
