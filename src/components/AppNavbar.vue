<template>
  <!-- Image and text -->
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                Vue-Mazing!
            </a>
            
            <div class="d-flex">
                <a href="#" @click="$bvModal.show('bv-modal-example')">
                    <i class="bi-info-circle" role="img" aria-label="Info" style="font-size: 20px"></i>
                </a>
                
                <!-- &nbsp;
                <a href="https://github.com/damarkrisnandi/vue-maze-game" target="_blank">
                    <i class="bi-github" role="img" aria-label="Github" style="font-size: 20px"></i>
                </a> -->
            </div>
        </div>
        </nav>
        
        <b-modal id="bv-modal-example" centered hide-footer>
            <template #modal-title>
            Guide
            </template>
            <div>
                Gunakan tombol <code>W</code>, <code>S</code>, <code>A</code>, <code>D</code> 
                untuk bergerak. Untuk mobile gunakan controller
            </div>
            <b-button class="mt-3" block @click="$bvModal.hide('bv-modal-example')">Paham!</b-button>
        </b-modal>
    </div>
</template>

<script>
export default {
    data: () => {
        return {
            isDialogOpen: false
        }
    },
    methods: {
        openDialog() {
            this.isDialogOpen = true;
            console.log('dialog open')
        }
    }
}
</script>

<style>

</style>