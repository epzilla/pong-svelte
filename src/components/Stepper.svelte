<script lang="ts">
  import StepperBtn from './StepperBtn.svelte';
  export let initialValue = 0;
  export const full = true;
  export let padSingleDigits = false;
  export let onChange: ({ full: boolean, amount: number }) => void = null;
  export let min = null;
  export let max = null;
  export let wrap = false;

  $: val = (initialValue || 0).toString();
  let classes = `stepper stepper-full`;

  $: {
    val = (initialValue || 0).toString();
    let intVal = parseInt(val);
    if (padSingleDigits && Math.abs(intVal) < 10) {
      if (intVal >= 0) {
        val = '0' + val;
      } else {
        val = '-0' + Math.abs(intVal);
      }
    }
  }

  function stepDown(e: MouseEvent) {
    e.preventDefault();
    let curVal = parseInt(val);
    if (typeof min !== 'undefined' && curVal === min) {
      if (wrap) {
        curVal = max;
      } else {
        return;
      }
    } else {
      curVal--;
    }

    if (padSingleDigits && Math.abs(curVal) < 10) {
      if (curVal >= 0) {
        val = '0' + curVal;
      } else {
        val = '-0' + Math.abs(curVal);
      }
    } else {
      val = curVal.toString();
    }

    onChange &&
      onChange({
        full: true,
        amount: curVal
      });
  }

  function stepUp(e: MouseEvent) {
    e.preventDefault();
    let curVal = parseInt(val);
    if (typeof max !== 'undefined' && curVal === max) {
      if (wrap) {
        curVal = min;
      } else {
        return;
      }
    } else {
      curVal++;
    }

    if (padSingleDigits && Math.abs(curVal) < 10) {
      if (curVal >= 0) {
        val = '0' + curVal;
      } else {
        val = '-0' + Math.abs(curVal);
      }
    } else {
      val = curVal.toString();
    }

    onChange &&
      onChange({
        full: true,
        amount: curVal
      });
  }
</script>

<div class={classes}>
  <StepperBtn btnPos="top" onClick={stepUp} />
  <div class="stepper-val">
    <span>{val}</span>
  </div>
  <StepperBtn btnPos="bottom" onClick={stepDown} />
</div>

<style lang="scss">
  .stepper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: bold;

    .stepper-val {
      order: 2;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 4rem;
      width: 5rem;

      > span {
        text-align: center;
        font-size: 2em;
      }
    }
  }
</style>
