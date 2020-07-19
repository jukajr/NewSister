<template>
    <div class="box-geral">
        <div v-if="loading" class="text-center text-danger my-2">
            <b-spinner class="align-middle"></b-spinner>
            <strong> Carregando...</strong>
        </div>

        <div v-else>
            <header class="budget-header">
                <div class="budget-header__logo">
                    <img src="../../../../../assets/logo.png" class="img-responsive"/>
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
                            <td>
                                {{ data.money_value | currencyReal }}
                                <!-- <b-input-group prepend="R$">
                                   <b-form-input ></b-form-input>
                                </b-input-group> -->
                            </td>
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
                                {{ custs.real.cust | currencyReal }}
                            </td>
                            <td align="right">
                                {{ custs.external.cust | currencyUsd }}
                            </td>
                        </tr>
                        <tr class="table-danger">
                            <td>
                                <strong>Overhead (+)</strong>
                            </td>
                            <td>
                                {{ data.pct_overhead | percentage }}
                            </td>
                            <td align="right">
                                {{ custs.real.t_overhead | currencyReal }}
                            </td>
                            <td align="right">
                                {{ custs.external.t_overhead | currencyUsd }}
                            </td>
                        </tr>
                        <tr class="table-danger">
                            <td>
                                <strong>Planejamento e Criação (+)</strong>
                            </td>
                            <td>
                                {{ data.pct_planning_creation | percentage }}
                            </td>
                            <td align="right">
                                {{ custs.real.t_planning_creation | currencyReal }}
                            </td>
                            <td align="right">
                                {{ custs.external.t_planning_creation | currencyUsd }}
                            </td>
                        </tr>
                        <tr class="table-danger">
                            <td>
                                <strong>Margem (+)</strong>
                            </td>
                            <td>
                                {{ data.pct_markup | percentage }}
                            </td>
                            <td align="right">
                                {{ custs.real.t_markup | currencyReal }}
                            </td>
                            <td align="right">
                                {{ custs.external.t_markup | currencyUsd }}
                            </td>
                        </tr>
                        <tr class="table-danger">
                            <td>
                                <strong>Desconto (-)</strong>
                            </td>
                            <td>
                                {{ data.pct_disconts | percentage }}
                            </td>
                            <td align="right">
                                {{ custs.real.t_disconts | currencyReal }}
                            </td>
                            <td align="right">
                                {{ custs.external.t_disconts | currencyUsd }}
                            </td>
                        </tr>
                        <tr class="table-danger">
                            <td>
                                <strong>Impostos (+)</strong>
                            </td>
                            <td>
                                {{ data.pct_taxes | percentage }}
                            </td>
                            <td align="right">
                                {{ custs.real.t_taxes | currencyReal }}
                            </td>
                            <td align="right">
                                {{ custs.external.t_taxes | currencyUsd }}
                            </td>
                        </tr>
                        <tr class="table-warning">
                            <td>
                                <strong>Valor final:</strong>
                            </td>
                            <td></td>
                            <td align="right">
                                {{ custs.real.total | currencyReal }}
                            </td>
                            <td align="right">
                                {{ custs.external.total | currencyUsd }}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </header>
            <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover table-contas table-sm">
                    <thead>
                    <tr>
                        <th width="80px;">Conta</th>
                        <th>Item</th>
                        <th width="80px;">Overhead</th>
                        <th width="80px;">Qtd</th>
                        <th width="80px;">Diárias</th>
                        <th>Unit. Value (BRL)</th>
                        <th>Sub Total (BRL)</th>
                        <th>Unit. Value (USD)</th>
                        <th>Sub Total (USD)</th>
                        <th>Anotação</th>
                        <th>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(account, index) in itensLoad" :class="{ 'table-danger': account.resource_type_id === 1, 'table-info': account.resource_type_id === 2 }" :key="account.id">
                        <template v-if="account.edit === false || account.edit === undefined">
                            <td align="center">{{ account.cost_center_code }}</td>
                            <td>{{ account.cost_center_desc }}</td>
                            <td align="center">
                            <span v-if="account.master">
                                <b-badge v-if="account.overhead" variant="success">Sim</b-badge>
                                <b-badge v-else variant="danger">Não</b-badge>
                            </span>
                            </td>
                            <td align="center"><span v-if="!account.master">{{ account.qtd }}</span></td>
                            <td align="center"><span v-if="!account.master">{{ account.day }}</span></td>
                            <td class="text-right"><span v-if="!account.master">{{ account.uni | currencyReal }}</span></td>
                            <td class="text-right">
                                <span v-if="account.master">
                                    {{ account.value | currencyReal }}
                                </span>
                                <span v-else>
                                    {{ (account.qtd * account.day * account.uni) | currencyReal }}
                                </span>                                
                            </td>
                            <td class="text-right">{{ account.uni / (data.money_value) | currencyUsd }}</td>
                            <td class="text-right">{{ (account.qtd * account.day * account.uni) / (data.money_value) | currencyUsd }}</td>
                            <td></td>
                            <td width="100" align="center">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button @click="editItem(index)" class="btn btn-primary btn-sm">
                                        <b-icon icon="pencil"></b-icon>
                                    </button>
                                    <button @click="deleteAccount(account.id)" class="btn btn-danger btn-sm">
                                        <b-icon icon="trash"></b-icon>
                                    </button>
                                </div>
                            </td>
                        </template>
                        <template v-else>
                            <td align="center">
                                <b-form-input v-model="edit.code" />
                            </td>
                            <td>
                                <b-form-input v-model="edit.desc" />
                            </td>
                            <td align="center">
                            <span v-if="account.parent_id === null">
                                <b-badge v-if="account.overhead" variant="success">Sim</b-badge>
                                <b-badge v-if="!account.overhead" variant="danger">Não</b-badge>
                            </span>
                            </td>
                            <td align="center">
                                <b-form-input v-model="edit.qtd" />
                            </td>
                            <td align="center">
                                <b-form-input v-model="edit.day" />
                            </td>
                            <td>
                                <b-form-input v-model="edit.uni" />
                            </td>
                            <td>
                                <b-form-input v-model="edit.subTotal" />
                            </td>
                            <td>
                                <b-form-input v-model="edit.unitUSD" />
                            </td>
                            <td>
                                <b-form-input v-model="edit.subTotalUSD" />
                            </td>
                            <td></td>
                            <td width="100" align="center">
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <button @click="editItem(index)" class="btn btn-success btn-sm">
                                        <b-icon icon="check"></b-icon>
                                    </button>
                                    <button @click="cancelItem(index)" class="btn btn-secondary btn-sm">
                                        <b-icon icon="x"></b-icon>
                                    </button>
                                </div>
                            </td>
                        </template>
                        
                    </tr>
                    <tr>
                        <td align="center">
                                <b-form-input v-model="newObject.code" />
                            </td>
                            <td>
                                <b-form-input v-model="newObject.desc" />
                            </td>
                            <td align="center">
                            
                            </td>
                            <td align="center">
                                <b-form-input type="number" min="1" v-model="newObject.qtd" />
                            </td>
                            <td align="center">
                                <b-form-input type="number" min="1" v-model="newObject.day" />
                            </td>
                            <td>
                                <money v-model="newObject.subTotal" class="form-control text-right" v-bind="money"></money>
                            </td>
                            <td>
                            </td>
                            <td>                                
                            </td>
                            <td>
                            </td>
                            <td>
                                <textarea class="form-control"></textarea>
                            </td>
                            <td>
                                <button @click="additem" class="btn btn-success btn-sm">
                                    <b-icon icon="check"></b-icon>
                                </button>
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
    import {Money} from 'v-money';

    export default {
        name: 'page-budget',
        data() {
            return {
                edit: {
                    id:0,
                    parent_id:null,
                    code:null,
                    desc:null,
                    overhead:null,
                    qtd:null,
                    day:null,
                    uni:null,
                    subTotal:null,
                    unitUSD:null,
                    subTotalUSD:null,
                },
                newObject: {
                    id:0,
                    parent_id:0,
                    code:'',
                    desc:null,
                    overhead:null,
                    qtd:null,
                    day:null,
                    uni:null,
                    subTotal:null,
                    unitUSD:null,
                    subTotalUSD:null,
                },
                itens: [
                ],
                data: {},
                money: {
                  decimal: ',',
                  thousands: '.',
                  prefix: 'R$ ',
                  suffix: '',
                  precision: 2,
                  masked: false
                }
            }
        },
        computed: {
            ...mapState([
                'loading',
                'item',
            ]),
            itensLoad() {
                return this.itens.map(i => {
                    if (this.verifyMaster(i.cost_center_code)) {
                        i.master = true;
                        const code = i.cost_center_code.substring(0, i.cost_center_code.length - 2);
                        i.value = this.itens.filter(it => it.cost_center_code.substring(
                                            0, it.cost_center_code.length - 2) === code 
                                            && i.cost_center_code != it.cost_center_code)
                                            .reduce((t, a) => {
                                                return t + (a.qtd * a.day * a.uni);
                                            }, 0);
                    } else {
                        i.master = false;
                    }
                   
                    return i;
                });
            },
            custs() {
                const cambio = this.data.money_value
                const cust = this.itensLoad.reduce((a, prox) => {
                    return !prox.master ? a + (prox.qtd * prox.day * prox.uni) : a;
                }, 0);
                const custOverhead = this.itensLoad.reduce((a, prox) => {
                    return prox.master && prox.overhead ? a + prox.value : a;
                }, 0);
                const {
                    pct_disconts,
                    pct_markup,
                    pct_overhead,
                    pct_planning_creation,
                    pct_taxes,
                } = this.data;

                const t_disconts = cust * (pct_disconts / 100);
                const t_markup = cust * (pct_markup / 100);
                const t_overhead = custOverhead * (pct_overhead / 100);
                const t_planning_creation = cust * (pct_planning_creation / 100);
                const t_taxes = ((cust + t_overhead + t_markup + t_overhead) - t_disconts) * (pct_taxes / 100);

                const total = ((cust + t_overhead + t_planning_creation + t_markup) - t_disconts) + t_taxes;

                return {
                    real: {
                        cust,
                        t_disconts,
                        t_markup,
                        t_overhead,
                        t_planning_creation,
                        t_taxes,
                        total
                    },
                    external: {
                        cust: cust / cambio,
                        t_disconts: t_disconts / cambio,
                        t_markup: t_markup / cambio,
                        t_overhead: t_overhead / cambio,
                        t_planning_creation: t_planning_creation / cambio,
                        t_taxes: t_taxes / cambio,
                        total: total / cambio
                    }
                };
            },
        },
        methods: {
            ...mapActions([
                'getBudget',
                'deleteBudgetAccount',
                'getBudgetdraft',
                'getBudgetdraftheader',
            ]),
            verifyMaster(code) {
                return code && code.substring(code.length - 2, code.length) === '00';
            },
            additem() {
                this.itens.push(this.newObject);
                this.newObject = {
                    id:0,
                    parent_id:0,
                    code:'',
                    desc:null,
                    overhead:null,
                    qtd:null,
                    day:null,
                    uni:null,
                    subTotal:null,
                    unitUSD:null,
                    subTotalUSD:null,
                };
                this.$forceUpdate();
            },
            editItem(index) {
                this.itens[index].edit = true;
                this.edit = this.itens[index];
                this.$forceUpdate();
            },
            cancelItem(index) {
                this.itens[index].edit = false;
                this.$forceUpdate();
            },
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
            this.getBudgetdraft({id, version: 1})
            .then(response => (this.itens = response));

            this.getBudgetdraftheader({id, version: 1})
            .then(response => (this.data = response[0]));
        },
        components: {Money},
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

        table {
            max-width: 650px;
            float: right;
        }
    }

    .text-right {
        text-align: right;
    }
</style>
