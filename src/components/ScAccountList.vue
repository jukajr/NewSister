<template>
    <b-form-select
            v-model="account"
            @input="changeAccount"
            :options="accounts"></b-form-select>
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
        },
        data() {
            return {
                account: this.value,
            };
        },
        watch: {
            value(value) {
                this.account = value;
            },
            account(account) {
                this.$emit('input', account);
            },
        },
        computed: {
            accounts() {
                const {
                    accounts = [],
                } = this.$store.state.budget;

                return [
                    {
                        value: null,
                        text: 'Conta principal',
                    },
                    ...accounts.map(account => ({
                        value: account.id,
                        text: `${account.code} - ${account.desc}`,
                    }))
                ];
            },
        },
        methods: {
            changeAccount(event) {
                this.$emit('input', event);
            },
        },
        created() {
            this.$store.dispatch('budget/getParentAccounts', this.active);
        },
    };
</script>
