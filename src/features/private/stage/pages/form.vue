<template>
    <div class="container">
        <h1>{{ isEdit ? 'Editar uma' : 'Criar nova' }} etapa</h1>
        <form class="box-new" @submit.prevent="save">
            <div class="form-group">
                <label for="code">Código</label>
                <input type="text" class="form-control" id="code" name="code" v-model="form.project_group_code">
            </div>
            <div class="form-group">
                <label for="desc">Nome</label>
                <input type="text" class="form-control" id="desc" name="desc" v-model="form.project_group_name">
            </div>
            <div class="form-group">
                <label for="uni">Tipo de Faturamento</label>
                <b-form-select :options="[]"></b-form-select>
            </div>
            <div class="form-group">
                <label for="uni">Tipo de Projetos</label>
                <b-form-select :options="[]"></b-form-select>
            </div>
            <div class="form-group">
                <label for="desc">Ano</label>
                <input type="number" class="form-control" id="day" name="day" v-model="form.project_group_year">
            </div>
            <div class="form-group">
                <label for="uni">Responsavel</label>
                <b-form-select :options="answerableSelect"></b-form-select>
            </div>
            <div class="form-group">
                <label for="uni">Status</label>
                <sc-status v-model="form.project_group_status_id" :start="form.project_group_status_id"></sc-status>
            </div>
            <button type="submit" class="btn btn-success">Salvar</button>
            <router-link :to="{
                name: 'projects',
                params: {
                    id: $route.params.id,
                },
            }" class="btn btn-default">Voltar</router-link>
        </form>

    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    import ScStatus from '../../../../components/ScStatus';

    const { mapActions, mapState } = createNamespacedHelpers('stage');

    export default {
        name: 'page-stage-form',
        data() {
            return {
                form: {
                    project_group_id: 0,
                    project_group_code: '',
                    project_group_name: '',
                    project_group_year: '',
                    project_group_status_id: 0,
                },
                isEdit: false,
                answerable: [],
            };
        },
        computed: {
            ...mapState([
                'loading',
            ]),
            answerableSelect() {
                return this.answerable.map(a => ({ value: a.entity_id, text: a.entity_first_name }));
            }
        },
        methods: {
            ...mapActions([
                'getProjectById',
                'getAnswerable',
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
            this.getAnswerable().then(res => this.answerable = res);
            const {
                id: id
            } = this.$route.params;

            if (id) {
                this.isEdit = true;
                this.project_group_id = id;
                return this.getProjectById(id)
                    .then(form => {this.form = form});
            }
        },
        components: {
            ScStatus,
        },
    }
</script>

<style lang="scss">
    .box-new{
        padding: 2rem 0;
    }
</style>
