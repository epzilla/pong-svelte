<script>
  import { debounce } from '../modules/helpers';
  export let onSelect;
  export let options;
  let matches = [];
  let options = [];
  let currentValue = '';
  let value = '';

  function select(item) {
    currentValue = item.val;
    value = item.val;
    matches = [];

    if (onSelect) {
      onSelect(item);
    }
  }

  function onClick(e) {
    select(e.target.dataset.val);
  }

  const onKeyUp = debounce((e) => {
    if (e.key === 'ArrowDown') {
      let i = matches.findIndex((m) => m.highlighted);
      if (i !== -1) {
        matches[i].highlighted = false;
        if (matches.length > i + 1) {
          matches[i + 1].highlighted = true;
        } else if (matches.length > 1) {
          matches[0].highlighted = true;
        }
        e.preventDefault();
      }
    } else if (e.key === 'ArrowUp') {
      let i = matches.findIndex((m) => m.highlighted);
      if (i !== -1) {
        matches[i].highlighted = false;
        if (matches.length > 1 && i === 0) {
          matches[matches.length - 1].highlighted = true;
        } else if (matches.length > 1) {
          matches[i - 1].highlighted = true;
        }
        e.preventDefault();
      }
    } else if (e.key === 'Enter' || e.key === 'Tab') {
      let h = state.matches.find((m) => m.highlighted);
      if (h) {
        select(h);
      }
    } else if (e.key === 'Escape') {
      matches = [];
    } else {
      currentValue = e.target.value;
      let matches =
        currentValue.length > 1
          ? options.filter(
              (o) => o.toLowerCase().indexOf(currentValue.toLowerCase()) !== -1
            )
          : [];
      matches = matches.map((m, i) => {
        return {
          val: m,
          highlighted: i === 0
        };
      });
    }
  }, 10);

  function onFocus(e) {
    e.target.select();
  }

  function onBlur(e) {
    let value = e.target.value;
    setState({ matches: [] });
    if (props.onSelect && value !== state.value) {
      props.onSelect({ val: value, fromBlur: true });
    }
  }
</script>

<div class="autocomplete">
  <input
    type="text"
    value={currentValue}
    on:keyup={onKeyUp}
    on:focus={onFocus}
    on:blur={onBlur}
  />
  {#if matches?.length > 0}
    <ul class="options-dropdown">
      {renderItems(matches)}
    </ul>
  {/if}
</div>

<style lang="scss">
  .autocomplete {
    position: relative;
    width: 140px;

    input {
      height: 36px;
      padding: 5px;
      width: 100%;
      border-radius: 4px;
      border: none;
    }

    .options-dropdown {
      position: absolute;
      margin: 0;
      padding: 0;
      list-style-type: none;
      background-color: white;
      border: 1px solid #ccc;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
      width: 100%;
      z-index: 1;

      .option {
        display: flex;
        align-items: center;
        font-size: 14px;
        padding: 8px 5px;

        &.highlighted {
          background-color: #cadff2;
        }

        .team-logo {
          margin-right: 5px;
        }
      }
    }
  }
</style>
