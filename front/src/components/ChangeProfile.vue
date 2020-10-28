<template>
<div class="changeProfile" align="center" justify="center">
    <v-container>
        <v-sheet
            rounded
            color="transparent"
            elevation="4"
            style="margin-top: 60px"
            height="500"
            width="350"
        >
    
        <h1>Modifier le profil</h1>
    
        <v-text-field
            id="newProfileName"
            label="Nom d'utilisateur"
            v-model="newProfileName"
            dark
            :error="isProfileNameInvalid"
            :error-messages="errorMessage"
            clearable
        ></v-text-field>
        <div class="buttons">
            <v-btn elevation="2" class="buttonSave" v-on:click="changeProfileName" light>Enregistrer</v-btn>
            <v-btn elevation="2" class="buttonAnnul" light>Annuler</v-btn>
            <v-btn  elevation="2" class="buttonSuppr" light>Supprimer le profil</v-btn>
        </div>
        </v-sheet>
    </v-container> 
</div>
</template>

<script>
import Resources from "../service/resources/resources"

const ResourcesService = new Resources();

export default {
    name: "ChangeProfile",
    data() {
        return {
            oldProfileName: "yaya",
            newProfileName: "yaya",
            isProfileNameInvalid: false,
            errorMessage: ""
        }
    },
    methods: {
        async changeProfileName() {
            this.newProfileName = document.getElementById("newProfileName").value;

            console.log("Old : " + this.oldProfileName + "\nNew : " + this.newProfileName)

            const PATCHRequest = ResourcesService.changeProfileName(this.oldProfileName,this.newProfileName);
            
            function getPATCHRequestResponse(PATCHRequest) {
                return PATCHRequest.then(function(res) {
                    return JSON.stringify(res);
                })
            }
            
            const msg = await getPATCHRequestResponse(PATCHRequest);

            if (msg.includes("Request failed with status code 404")) {
                this.isProfileNameInvalid = true;
                if (this.newProfileName.length == 0) {
                    this.errorMessage = "Veuillez entrer un nom de profil valide.";
                } else if(this.newProfileName.length > 15) {
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

.changeProfile {
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

.buttonSave{
    margin: 6%;
    width: 130px;
}
.buttonAnnul{
    margin: 6%;
    width: 130px;
}
.buttons{
    margin-top: 10%
}


.buttonSuppr{
    width: 300px;
    margin-top: 5%;
}


</style>