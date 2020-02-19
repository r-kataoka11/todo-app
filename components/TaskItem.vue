<template>
  <v-list-tile>
    <v-list-tile-action>
      <v-btn icon>
        <v-icon>radio_button_unchecked</v-icon>
      </v-btn>
    </v-list-tile-action>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-list-tile-content v-on="on">
          <v-list-tile-title>{{ task.title }}</v-list-tile-title>
          <v-list-tile-subtitle>{{ task.content }}</v-list-tile-subtitle>
        </v-list-tile-content>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal first name*" required />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal middle name" hint="example of helper text only on focus" />
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Legal last name*" hint="example of persistent helper text" persistent-hint required />
              </v-col>
              <v-col cols="12">
                <v-text-field label="Email*" required />
              </v-col>
              <v-col cols="12">
                <v-text-field label="Password*" type="password" required />
              </v-col>
              <v-col cols="12" sm="6">
                <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required />
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="dialog = false" color="blue darken-1" text>
            Close
          </v-btn>
          <v-btn @click="dialog = false" color="blue darken-1" text>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-list-tile-action>
      <v-btn icon>
        <v-icon>delete</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    dialog: false
  })
}
</script>
