<template>
    <section>
        <header class="header-principal">
            <div class="container-fluid">
                <div class="header-principal__content">
                    <a href="/">
                        <img src="../../../assets/logo-branco.png" class="img-responsive header-principal__img" />
                    </a>
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
            display: flex;
            align-items: center;
            text-align: left;
            justify-content: space-between;
        }
        &-principal__img{
            height: 40px;
        }
        &-principal__user{
            color: #fff;
        }
        &-principal__user-logoff{
            color: #fff;
            padding: 1rem;
            font-size: 1.2em;
        }
    }
</style>
