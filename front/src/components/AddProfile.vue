<template>
<div class="addProfile" align="center" justify="center">
    <v-container>
        <v-sheet
            rounded
            color="transparent"
            elevation="4"
            style="margin-top: 60px"
            height="500"
            width="350"
        >
    
        <h1>Ajouter un profil</h1>
    
        <v-text-field
            id="profileName"
            label="Nom de profil"
            dark
            :error="isProfileNameInvalid"
            :error-messages="errorMessage"
        ></v-text-field>
        <div class="buttons"> 
            <v-btn elevation="2" class="button" v-on:click="addProfile" light>Ajouter</v-btn>
            <v-btn elevation="2" class="button" light>Annuler</v-btn>
        </div>
        </v-sheet>
    </v-container> 
</div>
</template>

<script>
import Resources from "../service/resources/resources"

const ResourcesService = new Resources();

export default {
    name: "AddProfile",
    data() {
        return {
            profileName: "",
            isProfileNameInvalid: false,
            errorMessage: ""
        }
    },
    methods: {
        async addProfile() {
            this.profileName = document.getElementById("profileName").value;
            const profile = `{"pseudo":"${this.profileName}", "age":0, "dashboards":[]}`;
            const POSTRequest = ResourcesService.addProfile(JSON.parse(profile));

            function getPOSTRequestResponse(POSTRequest) {
                return POSTRequest.then(function(res) {
                    return JSON.stringify(res);
                })
            }
            
            const msg = await getPOSTRequestResponse(POSTRequest);

            if (msg.includes("Request failed with status code 400")) {
                this.isProfileNameInvalid = true;
                if (this.profileName.length == 0) {
                    this.errorMessage = "Veuillez entrer un nom de profil valide.";
                } else if(this.profileName.length > 15) {
                    this.errorMessage = "La taille du nom ne doit pas dépassé 15 caractères. Veuillez entrer un nom de profil valide.";
                } else {
                    this.errorMessage = "Ce nom de profil est déjà utilisé. Veuillez entrer un autre nom.";
                }
            } else {
                this.isProfileNameInvalid = false;
                alert("Une bonne redirection des familles sur la page des profils");
            }
        }
    }
};

</script>

<style scoped>

.addProfile {
    background-color: #3c3e41;
    height: 100%;
    color: white;
    
}

h1 {
    color: white;
    font-size: 30px;
    padding-top: 20%;
    font-weight: bold;
}

.v-text-field {
    margin-top: 30%;
    width: 160px;
}

.button{
    margin: 2%;
}

.buttons{
    margin-top: 20%
}


</style>