<template>
  <div style="margin-left: calc(50% - 50vw); width: 100vw;">
    <b-row >
        <b-button @click="$emit('direction', {key: 'w'})"><i class="bi-arrow-up-circle" role="img" aria-label="Info" style="font-size: 20px"></i></b-button>
    </b-row>

    
    <div class="row">
        <b-button class="col" @click="$emit('direction', {key: 'a'})"><i class="bi-arrow-left-circle" role="img" aria-label="Info" style="font-size: 20px"></i></b-button>
        <b-button class="col" @click="$emit('direction', {key: 'd'})"><i class="bi-arrow-right-circle" role="img" aria-label="Info" style="font-size: 20px"></i></b-button>
    </div>

    <b-row>
        <b-button class="col" @click="$emit('direction', {key: 's'})"><i class="bi-arrow-down-circle" role="img" aria-label="Info" style="font-size: 20px"></i></b-button>
    </b-row>
    
</div>
</template>

<script>
export default {

}
</script>

<style>
</style>