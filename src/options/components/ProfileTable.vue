<script setup lang="ts">
  import { defineProps, ref } from "vue";
  import { IProfile } from "../../types/profiles";
  import Icon from "../../components/Icon.vue";

  const emit = defineEmits(['newProfile', 'deleteProfile', 'updateProfile']);

  const newProfileName = ref<string>('');
  const newBaseUrl = ref<string>('');
  
  const profileNameToEdit = ref<IProfile['profileName'] | null>(null);
  const editedProfile = ref<IProfile>({ profileName: '', urlbase: '' })

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

  function startUpdateProfile(profile: IProfile) {
    profileNameToEdit.value = profile.profileName;
    editedProfile.value = { profileName: `${profile.profileName}`, urlbase: `${profile.urlbase}` }
  }

  function cancelProfileEdition() {
    profileNameToEdit.value = '';
    editedProfile.value = { profileName: '', urlbase: '' }
  }

  function handleUpdateProfile() {
    if (!editedProfile.value.profileName || !editedProfile.value.urlbase) {
      alert('Ningun campo puede estar vacio');
      return;
    }
    emit('updateProfile', { editedProfile: editedProfile.value, profileNameToEdit: profileNameToEdit.value });
    cancelProfileEdition();
  }
</script>

<template>
  <table class="table">
    <tbody>
      <tr>
        <th>Nombre del perfil</th>
        <th>Url base</th>
        <th>&nbsp;</th>
      </tr>
      <tr v-for="(profile, key) in props.profiles" :key="key">
        <td>
          <span v-if="profileNameToEdit !== profile.profileName">{{ profile.profileName }}</span>
          <input v-else v-model="editedProfile.profileName" type="text" name="profile-name" @keypress.enter="handleUpdateProfile" @keypress.esc="cancelProfileEdition" />
        </td>
        <td>
          <span v-if="profileNameToEdit !== profile.profileName">{{ profile.urlbase }}</span>
          <input v-else v-model="editedProfile.urlbase" type="text" name="base-url" @keypress.enter="handleUpdateProfile" @keypress.esc="cancelProfileEdition" />
        </td>
        <td class="table__action-column">
          <button v-if="profileNameToEdit !== profile.profileName" class="primary" @click="startUpdateProfile(profile)">
            <Icon icon="edit" :size="18" />
          </button>
          <button v-else class="primary" @click="handleUpdateProfile">
            <Icon icon="check" :size="18" />
          </button>
          <button v-if="profileNameToEdit !== profile.profileName" class="danger" @click="handleDeleteProfile(profile)">
            <Icon icon="trash" :size="18" />
          </button>
          <button v-else class="danger" @click="cancelProfileEdition">
            <Icon icon="cross" :size="18" />
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
    </tbody>
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
      grid-template-columns: min(40%, 34.375rem) 1fr 6rem;
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

    &__action-column {
      display: grid;
      place-content: center;
      gap: .512rem;

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
