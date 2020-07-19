<template>
    <div class="box-geral">
        <div class="container">
            <header class="box-header">
                <div class="box-header__title">
                    <h1 class="title">
                        Etapas
                    </h1>
                    <router-link
                            :to="{
                                name: 'stage-form',
                            }"
                            class="btn btn-success btn-sm">
                        Adicionar
                    </router-link>                    
                </div>                
            </header>

            <b-table
                    striped
                    hover
                    selectable
                    sticky-header
                    select-mode="single"
                    :items="projects2"
                    :fields="fields"
                    @row-selected="openBudget"
                    :busy="loading">
                <template v-slot:table-busy>
                    <div class="text-center text-danger my-2">
                        <b-spinner class="align-middle"></b-spinner>
                        <strong> Carregando...</strong>
                    </div>
                </template>
                <template v-slot:cell(project_group_status_id)="data">
                    <span v-html="data.item.project_group_status_id === 1 ? 'Ativo' : 'Inativo'" />
                </template>
                <template v-slot:cell(actions)="data">
                    <div style="width: 100px;">
                    <router-link
                            :to="{
                                name: 'project-form',
                                params: {
                                    id: data.id
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

    const { mapActions, mapState } = createNamespacedHelpers('stage');

    export default {
        name: 'page-stage',
        data() {
            return {
                fields: [
                    {
                        key: 'project_group_id',
                        label: 'Código',
                        sortable: true,
                        class: 'text-center',
                        width: 80,
                    },
                    {
                        key: 'project_group_name',
                        label: 'Nome',
                        sortable: true
                    },
                    {
                        key: 'Stages',
                        label: 'Etapas',
                        sortable: true
                    },
                    {
                        key: 'project_group_year',
                        label: 'Ano',
                        sortable: true
                    },
                    {
                        key: 'project_group_status_id',
                        label: 'Status',
                        class: 'text-center',
                        sortable: true
                    },
                    {
                        key: 'actions',
                        label: '',
                        class: 'text-center',
                        sortable: false
                    },
                ],
            };
        },
        computed: {
            ...mapState([
                'loading',
                'itens',
            ]),
        },
        methods: {
            ...mapActions([
                'getItens',
            ]),
        },
        created() {
            return this.getItens();
        }
    }
</script>

<style lang="scss">
    .box-geral{
        padding: 2rem;
    }

    .box-header{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .box-header__title{
        align-self: flex-start;
        display: block;
        width: 100%;

        .btn {
            float: right;
        }
    }

    .box-header__title .title{
        margin: 0;
        padding: 0;
    }

    .box-header__form{
        display: flex;
        align-items: center;
    }

    .box-header__form .form-group{
        padding: 0 1rem;
        width: 180px;
    }
</style>
