<template>
  <q-card>
    <q-card-section>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </q-card-section>
    <q-card-section>
      <q-form @submit="onSubmit" @reset="onReset" ref="formRef">
        <q-input
          v-model="formData.name"
          label="Name"
          outlined
          :rules="[val => !!val || 'Name is required']"
        />

        <q-input
          v-model="formData.email"
          label="Email"
          outlined
          :rules="[val => /.+@.+\..+/.test(val) || 'Enter a valid email']"
        />

        <slot name="additional-fields" :formData="formData" />

        <q-card-actions align="right">
          <q-btn
            label="Submit"
            color="primary"
            type="submit"
            :disable="!formValid"
          />
          <q-btn label="Reset" type="reset" color="warning" flat />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "Shared Form from remote-app",
  },
  description: {
    type: String,
    default: "Please fill out the form below.",
  },
});

const formData = ref({
  name: "",
  email: "",
});

const formRef = ref(null);

const formValid = computed(() => {
  if (!formRef.value) return false;
  return formRef.value.validate();
});

const onReset = () => {
  formData.value = { name: "", email: "" };
};

const onSubmit = () => {
  if (formValid.value) {
    console.log("Form Data Submitted:", formData.value);
  } else {
    console.log("Form Validation Failed");
  }
};
</script>

<style scoped>
q-card {
  max-width: 400px;
  margin: auto;
}
</style>
