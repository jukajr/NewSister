<template>
    <div class="box-geral">
        <div class="container">
            <div class="box-login">
                <h2><img src="../../../assets/logo-branco.png" class="img-responsive header-principal__img" /></h2>
                <b-alert
                  :show="dismissCountDown"
                  dismissible
                  fade
                  variant="danger"
                  @dismiss-count-down="countDownChanged"
                >
                  Usuário ou senha incorreto.
                </b-alert>
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
                dismissSecs: 5,
                dismissCountDown: 0,
            };
        },
        methods: {
            ...mapActions([
                'login',
            ]),
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            send() {
                if (this.form.username !== 'admin' 
                    || this.form.password !== 'admin') {
                    return this.dismissCountDown = this.dismissSecs;
                }
                return this.login(this.form)
                    .then((user) => {
                        Auth.updateUser(user);
                        return this.$router.push({
                            name: 'projects',
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
    .box-geral {
        background: #14233f;
        min-height: 105vh;
        margin-top: -32px;
        padding-top: 10vh;
    }

    .box-login{
        background-color: rgba(232,23,113,0.8);;
        padding: 3rem 5rem 5rem 5rem;
        border-radius: 10px;
        margin: 2rem auto;
        max-width: 400px;
        color: #fff;

        h2 {
            text-align: center;
        }
    }

    .btn-login{
        background-color: #fff;
        color: #e81771;
        font-weight: bold;
        text-transform: uppercase;
    }
</style>
