<!-- 
    import { Component } from 'preact';

export default class SegmentedControl extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
  }

  componentWillReceiveProps({ value }) {
    this.setState({ value });
  }

  

  render() {
    let opts = this.props.options.map(opt => {
      let classes = 'btn';

      if (opt.value === this.state.value) {
        classes += ' selected';
      }

      return (
        <button class={classes} onClick={(e) => this.onClick(opt.value)}>{opt.label}</button>
      );
    });

    return (
      <div class="segmented-control" onKeyup={this.onKeyup}>
        { opts }
      </div>
    );
  }
}
 -->
<script>
  export let options;
  export let onClick;
  export let value;

  function onKeyup(e) {
    if (
      e.target.nodeName === 'BUTTON' &&
      (e.key === 'Enter' || e.key === 'Space')
    ) {
      e.preventDefault();
      e.stopPropagation();
      onClick(e.target.dataset('value'));
    }
  }

  function handleClick(v) {
    value = v;
    onChange && onChange(value);
  }
</script>

<div class="segmented-control" on:keyup={onKeyup}>
  {#each options as opt}
    <button
      class:selected={opt.value === value}
      class="btn"
      on:click={(e) => handleClick(opt.value)}>{opt.label}</button
    >
  {/each}
</div>

<style lang="scss">
  .segmented-control {
    display: flex;
    align-items: stretch;

    .btn {
      background-color: white;
      background-image: linear-gradient(to bottom, white, white 70%, #dadada);
      border-radius: 0;
      border: 1px solid var(--primaryBtnBg);
      border-right: none;
      color: var(--primaryBtnBg);
      cursor: pointer;
      height: auto;
      min-height: 40px;
      max-width: calc(50vw - 1rem);

      &.selected {
        background: var(--primaryBtnBg);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5) inset;
        color: white;
      }

      &:first-of-type {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      &:last-of-type {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-right: 1px solid #0d5a9c;
      }
    }
  }
</style>
