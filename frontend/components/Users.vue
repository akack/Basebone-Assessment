<template lang="pug">
    div(class="container users")
        //- md-button.create-order-button.md-primary.md-raised.align-self-end Create User
        div(v-if="loading" class="d-flex justify-content-center")
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="border"></b-spinner>
        div(v-else)
            NewUser
            div(class="content")
                <md-table v-model="users" md-card>
                    <md-table-toolbar>
                        <div class="md-toolbar-section-start">
                            <h1 class="md-title">Users</h1>
                        </div>
                    </md-table-toolbar>

                    <md-table-empty-state md-label="No users found" :md-description="`No user found for this '${search}' query. Try a different search term or create a new user.`">
                        <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="grow"></b-spinner>
                    </md-table-empty-state>

                    <md-table-row slot="md-table-row" slot-scope="{ item }">
                        <md-table-cell md-label="Email" md-sort-by="name">{{ item.email }}</md-table-cell>
                        <md-table-cell md-label="Free Premium Items" md-sort-by="email">{{ item.free_premium_items }}</md-table-cell>
                        <md-table-cell md-label="Cell Number" md-sort-by="gender">{{ item.msisdn }}</md-table-cell>
                        <md-table-cell md-label="User Type" md-sort-by="title">{{ item.user_type }}</md-table-cell>
                        <md-table-cell md-label="" md-sort-by="title">
                            <b-button title="Delete user" class="btn-custom" @click="removeUser(item)">
                                <b-icon icon="x-circle"  aria-hidden="true" scale="1" variant="danger"></b-icon>
                            </b-button>
                        </md-table-cell>
                    </md-table-row>
                </md-table>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex';
import NewUser from './NewUser.vue'
import { BIcon, BIconArrowUp, BIconArrowDown } from 'bootstrap-vue'

export default Vue.extend({
    components: {   
        NewUser,
        BIcon,
        BIconArrowUp,
        BIconArrowDown
    },
    data() {
        return {
            users: {} as any,
            search: null,
            searched: [],
            loading: false,
            deleted: false,
            toastCount: 0
        }
    },
    computed: {
        ...mapGetters({ getAllUsers: 'getAllUsers' }),
    },
    async created() {
       const users = await this.getUsers();
       if (users.status === 'success') this.users = users.attributes;
       this.$root.$on('getUpdatedUsers', async () => {
            const users = await this.getUsers();
            if (users.status === 'success') this.users = users.attributes;
       })   
    },
    methods: {
        ...mapActions({
            getUsers: 'users/getUsers',
            deleteUser: 'users/deleteUser'
        }),
        newUser () {
            window.alert('Noop')
        },
        async removeUser(user: any) {
            try {
                await this.$fire({
                    title: 'Delete User',
                    text: `Are you sure you want to delete this user with email ${user.email}?`,
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#19bdc0',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes',
                }).then(async (r:any) => {
                    this.loading = true;
                    if(r.value) {
                        const result = await this.deleteUser(user.id);
                        if (result.status === 'success') {
                            this.$bvToast.toast(`User with email ${user.email} was deleted successfully`, {
                                title: 'Users',
                                autoHideDelay: 5000,
                                toaster: 'b-toaster-top-center',
                                variant: 'success'
                            })
                            await this.$root.$emit('getUpdatedUsers');
                        }
                    }
                    this.loading = false;
                });
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        }
    },

})
</script>

<style lang="css" scoped>
    .users {
        background-color: white;
        /* margin-top: 1em; */
    }
    .btn-custom {
        background-color: inherit;
        border: none;
    }
    .btn-custom:hover {
        background-color: inherit;
    }
</style>