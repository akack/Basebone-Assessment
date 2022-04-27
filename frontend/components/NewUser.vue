<template lang="pug">
    div.container
        div(v-if="loading" class="d-flex justify-content-center")
            <b-spinner style="width: 3rem; height: 3rem;" label="Large Spinner" type="border"></b-spinner>
        div(v-else)
            <b-button id="show-btn" v-b-modal.modal-prevent-closing>Create New User</b-button>
    
            <b-modal id="modal-prevent-closing" ref="modal" title="Submit user details" @show="resetModal" @hidden="resetModal" @ok="handleOk">
                <form ref="form" @submit.stop.prevent="handleSubmit">
                    <b-form-group label="Email" label-for="email-input" invalid-feedback="Valid email mail is required" :state="emailState">
                        <b-form-input id="email-input" type="email" v-model="email" :state="emailState" required></b-form-input>
                    </b-form-group>
                    <b-form-group label="Cell Number" label-for="cell-input" invalid-feedback="Valid cell number is required" :state="cellState">
                        <b-form-input id="cell-input" type="tel" v-model="cellNumber" :state="cellState" required></b-form-input>
                    </b-form-group>
                    <b-form-group label="User Type" label-for="type-input" invalid-feedback="User type is required" :state="typeState">
                        <b-form-input id="type-input" v-model="userType" :state="typeState" required></b-form-input>
                    </b-form-group>
                    <b-form-group label="Free Prem Items" label-for="prem-input" invalid-feedback="Free premium items is required" :state="free_premState">
                        <b-form-input id="prem-input" type="number" v-model="free_premium_items" :state="free_premState" required></b-form-input>
                    </b-form-group>
                </form>
                <template #modal-footer>
                    <div class="w-100">
                    <b-button variant="secondary" size="sm" class="float-left" @click="hide()"> Cancel </b-button>
                    <b-button variant="primary" size="sm" class="float-right" @click="handleSubmit()"> Submit </b-button>
                    </div>
                </template>
            </b-modal>
        hr
    
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex';
export default Vue.extend({
   data() {
      return {
        cellNumber: '',
        email: '',
        free_premium_items: '',
        userType: '',
        typeState: null as any,
        free_premState: null as any,
        emailState: null as any,
        cellState: null as any,
        submittedNames: [] as any,
        loading: false,
      }
    },
    methods: {
        ...mapActions({
            createUser: 'users/createUser',
            getUsers: 'users/getUsers'
        }),
        checkFormValidity() {
                let valid = true;
                if(!this.email) {
                    this.emailState = false;
                    valid = false;
                } else {
                    if (this.validateEmail(this.email)) {
                        this.emailState = true
                    } else {
                        this.emailState = false;
                        valid = false;
                    }
                };
                if (!this.cellNumber) {
                    this.cellState = false;
                    valid = false;
                } else {
                    if(this.validateMobile(this.cellNumber)) {
                        this.cellState = true;
                    } else {
                        this.cellState = false;
                        valid = false;
                    }
                }
                if (!this.userType) {
                    this.typeState = false;
                    valid = false;
                } else this.typeState = true;
                if (!this.free_premium_items) {
                    this.free_premState = false;
                    valid = false;
                } else this.free_premState = true;
                return valid;
        },
        resetModal() {
            this.email = '';
            this.cellNumber = '';
            this.free_premium_items = '';
            this.userType = '';
            this.emailState = null;
            this.cellState = null;
            this.free_premState = null;
            this.typeState = null;
        },
        handleOk(bvModalEvent: any) {
            bvModalEvent.preventDefault()
            this.handleSubmit()
        },
        async handleSubmit() {
            // Exit when the form isn't valid
            if (!this.checkFormValidity()) {
            return
            }
            this.loading = true;
            try {
                const user = {
                    "email": this.email,
                    "msisdn": this.cellNumber,
                    "oauth_user_id": null,
                    "user_type": this.userType,
                    "free_premium_items": parseInt(this.free_premium_items)
                };
                const newUser = await this.createUser(user);
                console.log(newUser)
                if(newUser.status === 'success') {
                    this.$bvToast.toast(`New user created successfully`, {
                        title: 'Users',
                        autoHideDelay: 5000,
                        toaster: 'b-toaster-top-center',
                        variant: 'success'
                    })
                    await this.$root.$emit('getUpdatedUsers');
                };
                this.loading = false
            } catch (error) {
            console.log(error);
            this.loading = false;
            }

            this.$nextTick(() => {
            this.$bvModal.hide('modal-prevent-closing')
            })
        },
        hide() {
            this.$bvModal.hide('modal-prevent-closing')
        },
        //Valid email
        validateEmail(email: string): boolean {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
        //validate mobile
        validateMobile(mobile: string): boolean {
            if (!mobile) {
                return false;
            }
            const cleaned = mobile.replace(/[\s+()-.]/g, '');
            const isNumber = /^\d+$/.test(cleaned);
            if (!isNumber) {
                return false;
            }
            if (cleaned.length === 10 && cleaned[0] === '0') {
                return true;
            }
            return cleaned.length >= 9 && cleaned.length <= 13;
        }
    }
})
</script>

<style scoped>

</style>