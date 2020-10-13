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
            class = "profileName"
            v-model="name"
            label="Nom de profil"
            dark
        ></v-text-field>
        <div class="buttons"> 
            <v-btn elevation="2" class="button" light>Ajouter</v-btn>
            <v-btn elevation="2" class="button" light>Annuler</v-btn>
        </div>
        </v-sheet>
    </v-container> 
</div>
</template>

<script>

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

.profileName {
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