<script lang="ts" setup>
  import { ref, onMounted } from 'vue'
  import Icon from '../components/Icon.vue';
  
  const SUBMIT_TYPE = Object.freeze({
    currentTab: 'current-tab',
    newTab: 'new-tab'
  })
  const FORM_FIELDS = Object.freeze({
    BASEURL: 'baseurl',
    ENDPOINT: 'endpoint'
  })
  const profiles = ref<Array<{ profileName: string, baseurl: string, disabled?: boolean, selected?: boolean }>>([]);

  onMounted(() => {
    profiles.value = [
      {
        profileName: 'Sin perfil',
        baseurl: '',
        disabled: true,
        selected: true
      }
    ]
  })

  function handleNavigation(event: any) {
    const buttonElement = (event as any).submitter as HTMLButtonElement;
    
    const baseurl = (event.target as any).elements[FORM_FIELDS.BASEURL].value;
    const endpoint = (event.target as any).elements[FORM_FIELDS.ENDPOINT].value;

    const url = baseurl + endpoint;
    if (buttonElement.name === SUBMIT_TYPE.currentTab) {
      window.location.assign(url)
      return;
    }
    
    window.open(url, '_blank');
  }

  function openOptions() {
    chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
  }
</script>

<template>
  <main class="popup">
    <form @submit.prevent="handleNavigation" class="navigation-form">
      <!-- Profile -->
      <div class="navigation-form__field">
        <label :for="FORM_FIELDS.BASEURL">
          Perfil
        </label>
        <select :name="FORM_FIELDS.BASEURL" :id="FORM_FIELDS.BASEURL">
          <option
            v-for="(profile, index) in profiles" :key="index"
            :value="profile.baseurl"
            :disabled="profile.disabled"
            :selected="profile.selected"
          >
            {{ profile.profileName }}
          </option>
        </select>
      </div>
      <!-- Endpoint -->
      <div class="navigation-form__field">
        <label for="FORM_FIELDS.ENDPOINT">Endpoint</label>
        <input type="text" :name="FORM_FIELDS.ENDPOINT" :id="FORM_FIELDS.ENDPOINT" autocomplete="off" >
      </div>
      <!-- Actions -->
      <div class="actions">
        <button type="button" @click="openOptions">
          <Icon icon="settings" />
        </button>
        <button type="submit" :name="SUBMIT_TYPE.newTab" class="primary">
          Nuevo tab
        </button>
        <button type="submit" :name="SUBMIT_TYPE.currentTab" class="primary-outline">
          Tab actual
        </button>
      </div>
    </form>
  </main>
</template>

<style lang="scss" scoped>
  .popup {
    padding: .512rem;
    width: 20rem;
    height: 14rem;

    & .navigation-form {
      gap: 1rem;
      width: 100%;
      height: 100%;
      
      &, &__field {
        display: flex;
        flex-flow: column;
      }

      &__field {
        gap: .5rem;
      }
    }

    .actions {
      display: flex;
      flex-flow: row-reverse;
      justify-content: space-around;
      margin-top: auto;
    }
  }
</style>