<template>
  <div align="center" justify="center" class="wifi">
    <div class="titre">IMirror</div>
    <div class="Wifi">
    {{/*  <v-text-field
        v-model="password"
        v-on:keyup="inputKeyPressed"
        label="Admin password"
        type="password"
        class="inputPassword"
        dark
        :error="isPasswordWrong"
        :error-messages="wrongPasswordMessage"
      ></v-text-field>*/}}
    <select v-model="selected" multiple>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
  <br>
{{/*<span>Sélectionné(s) : {{ selected }}</span>*/}}
      <v-btn v-on:click="WifiTentative" elevation="2" class="selectWifi" dark
        >selectWifi</v-btn
      >
    </div>
  </div>
</template>