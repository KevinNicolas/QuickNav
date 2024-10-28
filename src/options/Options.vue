<script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import ProfileTable from './components/ProfileTable.vue';
  import { localStorage } from '../utils/chrome.util'
  import { IProfile } from '../types/profiles';
  import { LocalStorageKeys } from '../types/localStorageKeys'

  
  const profiles = ref<Array<{ profileName: string; urlbase: string; }>>([]);

  onMounted(async () => {
    const localStorageItems = await localStorage.getItem('profiles')
    if (localStorageItems[LocalStorageKeys.profiles]?.length) profiles.value = localStorageItems[LocalStorageKeys.profiles];
  })

  function handleDeleteProfile(profile: IProfile) {
    profiles.value = profiles.value.filter(({ profileName }) => profileName !== profile.profileName );
    localStorage.setItem(LocalStorageKeys.profiles, profiles.value);
  }

  function handleNewProfile(newProfile: IProfile) {
    if (profiles.value.some(({ profileName }) => profileName.toLowerCase() === newProfile.profileName.toLowerCase())) return alert(`Ya existe un perfil con el nombre ${newProfile.profileName}`)
    profiles.value = [...profiles.value, newProfile]
    localStorage.setItem(LocalStorageKeys.profiles, profiles.value);
  }

  function handleUpdateProfile({ editedProfile, profileNameToEdit }: { editedProfile: IProfile, profileNameToEdit: string }) {
    const indexOfProfile = profiles.value.findIndex(({ profileName }) => profileName.toLowerCase() === profileNameToEdit.toLowerCase())
    if (indexOfProfile < 0) return alert(`No se encontro un perfil con el nombre "${profileNameToEdit}""`)

    profiles.value[indexOfProfile] = editedProfile;
    localStorage.setItem(LocalStorageKeys.profiles, profiles.value);
  }
</script>

<template>
  <main class="options">
    <h4>Lista de perfiles</h4>
    <profile-table
      :profiles="profiles"
      @delete-profile="handleDeleteProfile"
      @new-profile="handleNewProfile"
      @update-profile="handleUpdateProfile"
    />
  </main>
</template>

<style lang="scss" scoped>
  @import '../style.scss';

  h4 {
    font-size: 1.25rem;
  }

  .options {
    min-height: 35rem;
    margin: 1rem;
  }
</style>