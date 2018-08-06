<template>
<div class="row">
    <h1>Symptoms</h1>
    <div class="col-6">
    <ul>
        {{listSymptoms.length}}
        <li v-for="symptom in listSymptoms" v-bind:key="symptom._id">
            {{symptom.weight}} lbs {{symptom.height}} in = {{symptom.bmi}}
        </li>

    </ul>
    </div>
    <div class="col-4">
        <create-symptom-form v-on:create="doCreate" />
    </div>
</div>
</template>
<script>
    import CreateSymptom from '../components/crud/CreateSymptom';
    import { mapActions, mapGetters } from 'vuex';

    const Console = console;
    export default {
        name: "Symptoms",
        components: {
            'create-symptom-form': CreateSymptom
        },
        computed: {
            ...mapGetters({ listSymptoms: 'symptom/list' })
        },
        methods: {
            doCreate(model) {
                alert("Creating");
                this.createSymptom(model).then(() => {
                    alert("Done create");
                })
            },
            ...mapActions({ createSymptom: 'symptom/create', findSymptoms: 'symptom/find' } )
        },
        mounted () {
            this.findSymptoms();
        }
    }
</script>