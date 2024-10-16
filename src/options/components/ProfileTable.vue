<script setup lang="ts">
  import { defineProps, ref } from "vue";
  import { IProfile } from "../../types/profiles";
  import Icon from "../../components/Icon.vue";

  const emit = defineEmits(['newProfile', 'deleteProfile']);

  const newProfileName = ref<string>('');
  const newBaseUrl = ref<string>('');

  const props = defineProps<{
    profiles: IProfile[];
  }>();

  function resetNewProfileInputs() {
    newProfileName.value = ''
    newBaseUrl.value = ''
  }

  function handleNewProfile() {
    const newProfileInfo: IProfile = {
      profileName: newProfileName.value,
      urlbase: newBaseUrl.value
    }
    emit('newProfile', newProfileInfo)
    resetNewProfileInputs();
  }

  function handleDeleteProfile(profile: IProfile) {
    emit('deleteProfile', profile)
  }
</script>

<template>
  <table class="table">
    <tr>
      <th>Nombre del perfil</th>
      <th>Url base</th>
      <th>&nbsp;</th>
    </tr>
    <tr v-for="(profile, key) in props.profiles" :key="key">
      <td>{{ profile.profileName }}</td>
      <td>{{ profile.urlbase }}</td>
      <td class="table__action-column">
        <button class="danger" @click="handleDeleteProfile(profile)">
          <Icon icon="trash" :size="18" />
        </button>
      </td>
    </tr>
    <tr class="table__new_item">
      <td>
        <input v-model="newProfileName" type="text" name="profile-name" @keypress.enter="handleNewProfile" />
      </td>
      <td>
        <input v-model="newBaseUrl" type="text" name="base-url" @keypress.enter="handleNewProfile" />
      </td>
      <td class="table__action-column">
        <button v-if="newProfileName || newBaseUrl" class="primary" @click="handleNewProfile">
          <Icon icon="add" :size="18" />
        </button>
      </td>
    </tr>
  </table>
</template>

<style lang="scss" scoped>
  @import "../../style.scss";

  .table {
    --row-min-height: 2.5rem;
    width: calc(100% - 1rem);
    margin: 1rem auto;
    border: 1px solid #333;

    tr {
      display: grid;
      align-items: center;
      grid-template-columns: min(40%, 34.375rem) 1fr 3rem;
      border-bottom: 1px dashed #333;
      &:last-child, &:first-child {
        border-bottom: none;
      }

      th,
      td {
        display: flex;
        align-items: center;
        padding: 0.5rem;
        border-left: 1px dotted #333;
        min-height: var(--row-min-height);
        &:first-child {
          border-left: none;
        }
      }

      th {
        padding: 0.5rem;
        border-bottom: 1px solid #333;
      }

      td {
        overflow-x: hidden;
        text-overflow: ellipsis;
        word-break: break-all;
        line-height: 1.2rem;
        font-size: 12px;
      }
    }

    &__action-column {
      display: grid;
      place-content: center;

      button {
        width: 28px !important;
        height: 28px !important;
        padding: 0;
      }
    }

    tr.table__new_item {
      
      td {
        padding: 0;
        input {
          width: 100%;
          height: var(--row-min-height);
          background: transparent;
          outline: none;
          border: none;
          color: white;
          padding: .5rem;
        }
      }

    }
  }
</style>
