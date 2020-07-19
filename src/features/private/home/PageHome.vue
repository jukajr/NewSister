<template>
    <section>
        <header class="header-principal">
            <div class="container-fluid">
                <div class="header-principal__content">
                    <a href="/">
                        <img src="../../../assets/logo-branco.png" class="img-responsive header-principal__img" />
                    </a>
                    <div class="header-principal__menu">
                        <b-button variant="outline-light" href="/budget">Orçamento</b-button>
                        <b-dropdown text="Cadastro" variant="outline-light" class="m-2 pull-left">
                            <b-dropdown-item href="/projects">Projeto</b-dropdown-item>
                            <b-dropdown-item href="/stage">Etapa</b-dropdown-item>
                        </b-dropdown>
                    </div>                    
                    <div class="header-principal__user" v-if="user">
                        Olá, <strong>{{ user.user_login }}</strong>
                        <a @click="logout" class="header-principal__user-logoff">
                            <b-icon icon="arrow-bar-right"></b-icon>
                        </a>
                    </div>
                </div>
            </div>
        </header>
        <router-view />
    </section>
</template>

<script>
    import { Auth } from '../../../providers';

    export default {
        name: 'page-home',
        data() {
            return {
                user: Auth.getUser(),
            };
        },
        methods: {
            logout() {
                Auth.logout();
                return this.$router.push({
                    name: 'login',
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    .header{
        &-principal{
            background-color: #e81771;
            height: 60px;
            padding: 0.5rem 0;
        }
        &-principal__content{
            align-items: center;
            text-align: left;
            justify-content: space-between;
        }
        &-principal__menu{
            display: inline-block;
            margin-top: -2px;
        }
        &-principal__img{
            height: 40px;
            max-with: 100px;
            margin-top: -10px;
            margin-right: 20px;
        }
        &-principal__user{
            color: #fff;
            float: right;
            margin-top: 10px;
        }
        &-principal__user-logoff{
            color: #fff;
            padding: 1rem;
            font-size: 1.2em;
        }
    }
</style>
