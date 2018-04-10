<template>
    <v-content>
        <v-container fluid fill-height>
            <v-layout justify-center align-center>
                <v-card>
                    <p>Contact {{ $route.params.id }}</p>
                </v-card>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>

export default {
  name: 'contact'
}
</script>