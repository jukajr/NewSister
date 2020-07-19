<template>
    <div class="container">
        <h1>{{ isEdit ? 'Editar um' : 'Criar novo' }} projeto</h1>
        <form class="box-new" @submit.prevent="save">
            <div class="form-group">
                <label for="code">Código</label>
                <input type="text" class="form-control" id="code" name="code" v-model="form.project_group_code" required>
            </div>
            <div class="form-group">
                <label for="desc">Nome</label>
                <input type="text" class="form-control" id="desc" name="desc" v-model="form.project_group_name" required>
            </div>
            <div class="form-group">
                <label for="desc">Ano</label>
                <input type="number" class="form-control" id="day" name="day" v-model="form.project_group_year" required>
            </div>
            <div class="form-group">
                <label for="desc">Descrição</label>
                <textarea class="form-control" v-model="form.project_group_desc"></textarea>
            </div>
            <div class="form-group">
                <label for="uni">Internal Company</label>
                <b-form-select :options="internalCompanyOptions" v-model="form.internal_company_id" required></b-form-select>
            </div>
            <div class="form-group">
                <label for="uni">Status</label>
                <sc-status v-model="form.project_group_status_id" :start="form.project_group_status_id" required></sc-status>
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

    const { mapActions, mapState } = createNamespacedHelpers('project');

    export default {
        name: 'page-project-form',
        data() {
            return {
                form: {
                    project_group_id: 0,
                    internal_company_id: 0,
                    project_group_code: '',
                    project_group_desc: '',
                    project_group_name: '',
                    project_group_year: '',
                    project_group_status_id: 0,
                },
                internal_company: [],
                isEdit: false,
            };
        },
        computed: {
            ...mapState([
                'loading',
            ]),
            internalCompanyOptions() {
                return this.internal_company.map(i => ({
                    value: i.internal_company_id,
                    text: i.internal_company_desc
                }));
            }
        },
        methods: {
            ...mapActions([
                'getProjectById',
                'setProject',
                'getInternalCompany',
            ]),
            save() {
                this.setProject(this.form).then(() => {
                    this.$router.push({ name: 'projects' });
                })                
            },
        },
        created() {
            const {
                id: id
            } = this.$route.params;

            this.getInternalCompany()
                .then(response => this.internal_company = response);

            if (id) {
                console.log('asdasdasdasd');
                this.isEdit = true;
                this.form.project_group_id = id;
                this.getProjectById(id)
                    .then(form => this.form = form);
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
