<template>
    <div class="box-geral">
        <div v-if="loading" class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong> Carregando...</strong>
        </div>

        <div v-else>
            <header class="budget-header">
                <div class="budget-header__logo">
                    <img src="../../../assets/logo.png" class="img-responsive"/>
                </div>

                <div class="budget-header__product">
                    <table class="table table-striped table-bordered">
                        <tbody>
                        <tr>
                            <td colspan="3">
                                <strong>Informações do orçamento</strong>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Produto</strong>
                            </td>
                            <td>{{ item.budget.budget_field_produto }}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Cliente</strong>
                            </td>
                            <td>{{ item.budget.client_name }}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Agência</strong>
                            </td>
                            <td>{{ item.budget.agency_name }}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Data</strong>
                            </td>
                            <td>{{ item.budget.budget_field_data }}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Câmbio</strong>
                            </td>
                            <td>{{ item.quote | currencyReal }}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div class="budget-header__total">
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th colspan="2"></th>
                            <th>BRL</th>
                            <th>USD</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr class="table-success">
                            <td>
                                <strong>Custo</strong>
                            </td>
                            <td></td>
                            <td align="right">
                                {{ item.totalCostBRL | currencyReal }}
                            </td>
                            <td align="right">
                                {{ item.totalCostUSD | currencyUsd }}
                            </td>
                        </tr>
                        <tr class="table-danger">
                            <td>
                                <strong>Operação (+)</strong>
                            </td>
                            <td>
                                {{ item.percents.operation | percentage }}
                            </td>
                            <td align="right">
                                {{ item.totalOperationBRL | currencyReal }}
                            </td>
                            <td align="right">
                                {{ item.totalOperationUSD | currencyUsd }}
                            </td>
                        </tr>
                        <tr class="table-danger">
                            <td>
                                <strong>Overhead (+)</strong>
                            </td>
                            <td>
                                {{ item.percents.overhead | percentage }}
                            </td>
                            <td align="right">
                                {{ item.totalOverheadBRL | currencyReal }}
                            </td>
                            <td align="right">
                                {{ item.totalOverheadUSD | currencyUsd }}
                            </td>
                        </tr>
                        <tr class="table-danger">
                            <td>
                                <strong>Desconto (-)</strong>
                            </td>
                            <td>
                                {{ item.percents.discount | percentage }}
                            </td>
                            <td align="right">
                                {{ item.totalDiscountBRL | currencyReal }}
                            </td>
                            <td align="right">
                                {{ item.totalDiscountUSD | currencyUsd }}
                            </td>
                        </tr>
                        <tr class="table-danger">
                            <td>
                                <strong>Impostos (+)</strong>
                            </td>
                            <td>
                                {{ item.percents.fee | percentage }}
                            </td>
                            <td align="right">
                                {{ item.totalFeeBRL | currencyReal }}
                            </td>
                            <td align="right">
                                {{ item.totalFeeUSD | currencyUsd }}
                            </td>
                        </tr>
                        <tr class="table-warning">
                            <td>
                                <strong>Valor final:</strong>
                            </td>
                            <td></td>
                            <td align="right">
                                {{ item.totalBRL | currencyReal }}
                            </td>
                            <td align="right">
                                {{ item.totalUSD | currencyUsd }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </header>

            <hr />

            <div class="form-group">
                <router-link :to="{
                    name: 'budget-manage',
                    params: {
                        budget_id: item.budget.budget_id
                    }
                }" class="btn btn-success">Incluir conta</router-link>
                <router-link :to="{ name: 'project' }" class="btn">Voltar</router-link>
            </div>

            <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover table-contas">
                    <thead>
                    <tr>
                        <th>Conta</th>
                        <th>Item</th>
                        <th>Overhead</th>
                        <th>Role</th>
                        <th>Qtd</th>
                        <th>Diárias</th>
                        <th>Unit. Value (BRL)</th>
                        <th>Sub Total (BRL)</th>
                        <th>Unit. Value (USD)</th>
                        <th>Sub Total (USD)</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="account in item.items" :key="account.id" :class="{'table-warning': account.parent_id === null}">
                        <td align="center">{{ account.code }}</td>
                        <td>{{ account.desc }}</td>
                        <td align="center">
                        <span v-if="account.parent_id === null">
                            <b-badge v-if="account.overhead" variant="success">Sim</b-badge>
                            <b-badge v-if="!account.overhead" variant="danger">Não</b-badge>
                        </span>
                        </td>
                        <td>{{ account.desc }}</td>
                        <td align="center">{{ account.qtd }}</td>
                        <td align="center">{{ account.day }}</td>
                        <td>{{ account.uni | currencyReal }}</td>
                        <td>{{ account.subTotal | currencyReal }}</td>
                        <td>{{ account.unitUSD | currencyUsd }}</td>
                        <td>{{ account.subTotalUSD | currencyUsd }}</td>
                        <td width="100" align="center">
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <router-link
                                        :to="{
                                            name: 'budget-manage',
                                            params: {
                                                id: item.budget.budget_id,
                                                account_id: account.id
                                            }
                                        }"
                                        class="btn btn-primary btn-sm">
                                    <b-icon icon="pencil"></b-icon>
                                </router-link>
                                <button @click="deleteAccount(account.id)" class="btn btn-danger btn-sm">
                                    <b-icon icon="trash"></b-icon>
                                </button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';

    const { mapActions, mapState } = createNamespacedHelpers('budget');

    export default {
        name: 'page-budget',
        computed: {
            ...mapState([
                'loading',
                'item',
            ]),
        },
        methods: {
            ...mapActions([
                'getBudget',
                'deleteBudgetAccount',
            ]),
            deleteAccount(account_id) {
                return this.$bvModal.msgBoxConfirm('Data was submitted successfully', {
                    title: 'Tem certeza ?',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    okTitle: 'Sim',
                    cancelTitle: 'Não',
                    footerClass: 'p-2',
                    hideHeaderClose: false,
                    centered: true
                })
                    .then((value) => {
                        if (value) {
                            const {
                                id,
                            } = this.$route.params;

                            this.deleteBudgetAccount(id, account_id)
                                .then(() => this.getBudget(id));
                        }
                    });
            }
        },
        created() {
            const {
                id,
            } = this.$route.params;
            return this.getBudget(id);
        }
    }
</script>

<style lang="scss">
    .box-geral{
        padding: 1rem;
    }

    .budget-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .budget-header__product{
        padding: 0 5rem;
    }

    .budget-header__product .table{
        width: 400px;
    }

    .budget-header__total{
        flex: 1;
    }
</style>
