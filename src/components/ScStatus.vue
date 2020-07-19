<template>
    <b-form-select
            v-model="select"
            @input="changeSelect"
            :options="options"></b-form-select>
</template>

<script>
    export default {
        name: 'sc-account-list',
        props: {
            value: {
                type: [Number, String],
                default: null,
            },
            active: {
                type: Boolean,
                default: true,
            },
            required: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            start: {
                type: [Number, String],
                default: 0,
            }
        },
        data() {
            return {
                options: [
                    { value: 0, text: 'Inativo' },
                    { value: 1, text: 'Ativo' },
                ],
                select: 1,
            };
        },
        watch: {
            value(value) {
                this.select = value;
            },
            select(select) {
                this.$emit('input', select);
            },
        },
        methods: {
            changeSelect(event) {
                this.$emit('input', event);
            },
        },
        mounted() {
            this.select = this.start;
        },
    };
</script>
