<template>
  <div>
    <label 
      :class="{ hidden: hideLabel }"
      :for="id"
    >
      {{ label }}
    </label>
    <InputSelect
      :id="id"
      v-model="localValue"
      :name="name"
      :required="required"
      :options="options"
      :option-value="optionValue"
      :option-label="optionLabel"
    />
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
      default: () => [],
    },
    optionValue: {
      type: String,
      default: 'id',
    },
    optionLabel: {
      type: String,
      default: 'name',
    },
    required: {
      type: Boolean,
      default: false,
    },
    hideLabel: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
  },
}
</script>
