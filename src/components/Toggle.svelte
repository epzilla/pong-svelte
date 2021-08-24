<!-- 
    const Toggle = ({ onOff, toggled, property, id, altColor }) => {

  return (
    <div class={`toggle ${altColor ? 'alt-color' : ''}`}>
      <input id={id} type="checkbox" checked={onOff} onChange={(e) => toggled(property)} />
      <label for={id}>Toggle</label>
    </div>
  );
};

export default Toggle;
 -->
<script>
  export let altColor;
  export let onOff;
  export let toggled;
  export let property;
  export let id;
</script>

<div class={`toggle ${altColor ? 'alt-color' : ''}`}>
  <input
    {id}
    type="checkbox"
    checked={onOff}
    on:change={(e) => toggled(property)}
  />
  <label for={id}>Toggle</label>
</div>

<style lang="scss">
  .toggle {
    input[type='checkbox'] {
      height: 0;
      width: 0;
      position: absolute;
      visibility: hidden;
    }

    label {
      cursor: pointer;
      text-indent: -9999px;
      width: 40px;
      height: 20px;
      background: var(--colorDisabledText);
      display: block;
      border-radius: 10px;
      position: relative;
    }

    label:after {
      content: '';
      position: absolute;
      top: 2px;
      left: 2px;
      width: 16px;
      height: 16px;
      background: #fff;
      border-radius: 50%;
      transition: 0.3s;
    }

    input:checked + label {
      background: var(--primary);
    }

    &.alt-color input:checked + label {
      background: var(--primaryBtnBg);
    }

    input:checked + label:after {
      left: calc(100% - 2px);
      transform: translateX(-100%);
    }

    label:active:after {
      width: 26px;
    }
  }
</style>
