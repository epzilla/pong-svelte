<script>
  import Rest from '../modules/rest';

  export let avatar;
  export let avatarUpdatedCallback;
  export let big;
  export let coin;
  export let editable;
  export let fname;
  export let newAvatar;
  export let lname;
  export let empty;

  function edit(e) {
    let input = e.currentTarget.querySelector('input');
    if (input) {
      input.click();
    }
  }

  function processChange(e) {
    uploadFile(e.target.files[0]);
  }

  function uploadFile(file) {
    if (file.type.includes('image')) {
      let reader = new FileReader();
      reader.onload = async () => {
        newAvatar = reader.result;
        await Rest.put('avatar', { avatar: newAvatar });
        if (avatarUpdatedCallback) {
          avatarUpdatedCallback(newAvatar);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  function handleDragenter(e) {
    e.preventDefault();
  }

  function handleDragleave(e) {
    e.target.classList.remove('can-drop');
  }

  function handleDragover(e) {
    if ([...e.dataTransfer.types].includes('Files')) {
      e.preventDefault();
      e.target.classList.add('can-drop');
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      uploadFile(e.dataTransfer.files[0]);
    }
  }

  let classes = 'avatar';
  if (big) {
    classes += ' big';
  }

  if (empty) {
    classes += ' empty';
  }

  if (coin) {
    classes += ' coin';
  }

  if (editable) {
    classes += ' editable';
  }
</script>

{#if editable}
  <div
    class={classes}
    on:click={edit}
    on:dragenter={handleDragenter}
    on:dragover={handleDragover}
    on:dragleave={handleDragleave}
    on:drop={handleDrop}
    style={{
      backgroundImage: avatar
        ? `url(${avatar})`
        : `url(/assets/images/default_avatar.png)`
    }}
  >
    <input type="file" value={newAvatar} onChange={processChange} />
    <div class="edit-overlay">
      <span>Click to change</span>
    </div>
  </div>
{:else if fname || lname}
  <div class={classes}>
    <span class="avatar-initials"
      >{fname ? fname[0] : ''}{lname ? lname[0] : ''}</span
    >
  </div>
{:else if empty}
  <div class={classes}>
    <span class="avatar-empty">
      <i class="fa fa-user-circle" />
    </span>
  </div>
{:else}
  <div
    class={classes}
    style={{
      backgroundImage: avatar
        ? `url(${avatar})`
        : `url(/assets/images/default_avatar.png)`
    }}
  />
{/if}
