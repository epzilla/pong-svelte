<script>
  import DeviceListItem from './DeviceListItem.svelte';
  import Modal from './Modal.svelte';
  import SelectList from './SelectList.svelte';
  export let devices = [];
  export let onSelect;
  export let postAlert;
  let selectedDevices = [];

  function toggleItemSelected(d) {
    let allSelected = [...selectedDevices];
    const i = allSelected.indexOf(d);
    if (i === -1) {
      allSelected.push(device);
    } else {
      allSelected.splice(i, 1);
    }

    selectedDevices = allSelected;
  }

  function submit() {
    if (selectedDevices && selectedDevices.length > 0) {
      select(selectedDevices);
    } else if (postAlert) {
      postAlert({ type: 'error', msg: NO_DEVICES_SELECTED_ERROR });
    }
  }
</script>

<Modal>
  <svelte:fragment slot="header">
    <h2>Select Devices</h2>
    <p>
      Choose one or more other registered devices who can update scores for this
      match. Hit the "Share" button when you're done.
    </p>
  </svelte:fragment>
  <svelte:fragment slot="content">
    <div class="flex-1 flex-col margin-bottom-1rem">
      <div class="device-select-list-wrap flex-1 flex-col">
        <SelectList
          className="device-select-list"
          selectedItems={selectedDevices}
          items={devices}
          onSelect={toggleItemSelected}
          component={DeviceListItem}
        />
      </div>
    </div>
    <div class="btn-wrap margin-1rem flex-shrink-0 flex-col">
      <button class="btn big success" on:click={submit}>Share</button>
    </div>
  </svelte:fragment>
</Modal>
