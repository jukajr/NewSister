<template>
    <div class="box-geral">
        <div class="container">
            <header class="budget-header">
                <div class="budget-header__title">
                    <h1 class="title">Orçamentos - {{ project.project_group_name }}</h1>
                    <router-link
                            :to="{
                                name: 'stage-form',
                            }"
                            class="btn btn-success btn-sm">
                        Adicionar
                    </router-link>
                </div>
            </header>
            <!-- <div>
                <form @submit.prevent="filter" class="budget-header__form">
                    <div class="form-group">
                        <label for="company">Empresa</label>
                        <select name="company" class="form-control">
                            <option value="">Selecione</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="company">Status</label>
                        <select name="company" class="form-control">
                            <option value="">Selecione</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="company">Etapas</label>
                        <select name="company" class="form-control">
                            <option value="">Selecione</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="company">Projetos</label>
                        <select name="company" class="form-control">
                            <option value="">Selecione</option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label for="company">Busca</label>
                        <input type="text" class="form-control" name="search" />
                    </div>

                    <div>
                        <button type="reset" class="btn btn-default">Limpar</button>
                        <button type="submit" class="btn btn-primary">Buscar</button>
                    </div>
                </form>
            </div> -->

            <b-table
                    striped
                    hover
                    selectable
                    select-mode="single"
                    :items="budgets"
                    :fields="fields"
                    :tbody-tr-class="rowClass"
                    @row-selected="openBudget"
                    :busy="loading">
                <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Carregando...</strong>
                    </div>
                </template>
                <template v-slot:cell(actions)="data">
                    <div style="width: 100px;">
                    <router-link
                            :to="{
                                name: 'stage-form',
                                params: {
                                    id: data.item.project_group_id
                                }
                            }"
                            class="btn btn-primary btn-sm">
                        <b-icon icon="pencil"></b-icon>

                    </router-link>
                    <button class="btn btn-danger btn-sm">
                        <b-icon icon="trash"></b-icon>
                    </button>
                </div>
                </template>
            </b-table>
        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';

    const { mapActions, mapState } = createNamespacedHelpers('budget');

    export default {
        name: 'page-project',
        data() {
            return {
                budgets: [],
                project: {},
                fields: [
                    {
                        key: 'budget_id',
                        label: 'Código',
                        sortable: true,
                        class: 'text-center',
                        width: 80,
                    },
                    {
                        key: 'internal_company_desc',
                        label: 'Empresa',
                        sortable: true
                    },
                    {
                        key: 'budget_internal_name',
                        label: 'Nome interno',
                        sortable: true
                    },
                    {
                        key: 'budget_desc',
                        label: 'Descrição',
                        sortable: true
                    },
                    {
                        key: 'billing_type_desc',
                        label: 'Faturamento',
                        class: 'text-center',
                        sortable: true
                    },
                    {
                        key: 'projects',
                        label: 'Projetos',
                        sortable: true
                    },
                    {
                        key: 'etapas',
                        label: 'Etapas',
                        sortable: true
                    },
                    {
                        key: 'budget_status_desc',
                        label: 'Status',
                        class: 'text-center',
                        centered: true,
                    },
                    {
                        key: 'actions',
                        label: '',
                        class: 'text-center',
                        centered: true,
                    }
                ],
            };
        },
        computed: {
            ...mapState([
                'loading',
            ]),
        },
        methods: {
            ...mapActions([
                'getBudgets',
                'getProjectById',
            ]),
            rowClass(item, type) {
                if (!item || type !== 'row') return
                if (item.budget_status_desc === 'Aprovado') return 'table-success'
            },
            openBudget(selected) {
                const [row] = selected || [];
                const {budget_id} = row || {};
                return this.$router.push({
                    name: 'budget-detail',
                    params: {
                        id: budget_id,
                    },
                });
            },
        },
        created() {
            const {
                id: id
            } = this.$route.params;

            this.getProjectById(id)
                .then(response => this.project = response);

            this.getBudgets(id)
            .then(response => (this.budgets = response));
        }
    }
</script>

<style lang="scss">
    .box-geral{
        padding: 2rem;
    }

    .budget-header{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .budget-header__title{
        align-self: flex-start;
        display: block;
        width: 100%;

        .btn {
            float: right;
        }
    }

    .budget-header__title .title{
        margin: 0;
        padding: 0;
    }

    .budget-header__form{
        display: flex;
        align-items: center;
    }

    .budget-header__form .form-group{
        padding: 0 1rem;
        width: 180px;
    }
</style>
