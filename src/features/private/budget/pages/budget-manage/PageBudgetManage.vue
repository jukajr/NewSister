<template>
    <div class="container">
        <h1>{{ isEdit ? 'Editar uma' : 'Criar nova' }} conta</h1>
        <form class="box-new" @submit.prevent="save">
            <div class="form-group">
                <label for="parentId">Conta mãe</label>
                <sc-account-list id="parentId" v-model="form.parentId"></sc-account-list>
            </div>
            <div class="form-group">
                <label for="code">Código</label>
                <input type="text" class="form-control" id="code" name="code" v-model="form.code">
            </div>
            <div class="form-group">
                <label for="desc">Descrição</label>
                <input type="text" class="form-control" id="desc" name="desc" v-model="form.desc">
            </div>
            <div class="form-group">
                <label for="desc">Quantidade</label>
                <input type="number" class="form-control" id="qtd" name="qtd" v-model="form.qtd" :disabled="!form.parentId">
            </div>
            <div class="form-group">
                <label for="desc">Diárias</label>
                <input type="number" class="form-control" id="day" name="day" v-model="form.day" :disabled="!form.parentId">
            </div>
            <div class="form-group">
                <label for="uni">Valor unitário</label>
                <input type="number" class="form-control" id="uni" name="uni" step=".01" v-model="form.uni" :disabled="!form.parentId">
            </div>
            <div class="checkbox">
                <label>
                    <input type="checkbox" id="overhead" name="overhead" v-model="form.overhead" :disabled="form.parentId"> Overhead
                </label>
            </div>
            <button type="submit" class="btn btn-success">Salvar conta</button>
            <router-link :to="{
                name: 'budget',
                params: {
                    id: $route.params.id,
                },
            }" class="btn btn-default">Voltar</router-link>
        </form>

    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    import ScAccountList from '../../../../../components/ScAccountList';

    const { mapActions, mapState } = createNamespacedHelpers('budget');

    export default {
        name: 'page-budget-manage',
        data() {
            return {
                form: {},
                isEdit: false,
            };
        },
        computed: {
            ...mapState([
                'loading',
            ]),
        },
        methods: {
            ...mapActions([
                'getBudgetAccount',
                'createBudgetAccount',
                'updateBudgetAccount',
            ]),
            save() {
                const {
                    id: budget_id,
                    account_id: id,
                } = this.$route.params;

                let promise;

                if (this.isEdit) {
                    promise = this.updateBudgetAccount({
                        budget_id,
                        id,
                        ...this.form,
                    });
                } else {
                    promise = this.createBudgetAccount({
                        budget_id,
                        ...this.form,
                    });
                }

                return promise.then(() => this.$router.push({
                    name: 'budget',
                    params: {
                        id: budget_id,
                    },
                }));
            },
        },
        created() {
            const {
                id: budget_id,
                account_id,
            } = this.$route.params;

            if (budget_id && account_id) {
                this.isEdit = true;
                return this.getBudgetAccount(budget_id, account_id)
                    .then(form => this.form = form);
            }
        },
        components: {
            ScAccountList,
        },
    }
</script>

<style lang="scss">
    .box-new{
        padding: 2rem 0;
    }
</style>
