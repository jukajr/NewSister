<template>
    <div class="box-geral">
        <div class="container">
            <div class="box-login">
                <h2>Login</h2>
                <form @submit.prevent="send">
                    <div class="form-group">
                        <label for="username">Usuário</label>
                        <input type="text" class="form-control" id="username" v-model="form.username" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Senha</label>
                        <input type="password" class="form-control" id="password" v-model="form.password" required>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block btn-login">Entrar</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';
    import { Auth } from '../../../providers';

    const { mapActions } = createNamespacedHelpers('login');


    export default {
        name: 'page-login',
        data() {
            return {
                form: {
                    username: null,
                    password: null,
                },
            };
        },
        methods: {
            ...mapActions([
                'login',
            ]),
            send() {
                return this.login(this.form)
                    .then((user) => {
                        Auth.updateUser(user);
                        return this.$router.push({
                            name: 'project',
                        });
                    });
            },
            logout() {
                Auth.logout();
                return this.$router.push({
                    name: 'login',
                });
            },
        },
    }
</script>

<style lang="scss" scoped>
    .box-login{
        background-color: #e81771;
        padding: 5rem;
        border-radius: 10px;
        margin: 2rem auto;
        max-width: 400px;
        color: #fff;
    }

    .btn-login{
        background-color: #fff;
        color: #e81771;
        font-weight: bold;
        text-transform: uppercase;
    }
</style>
