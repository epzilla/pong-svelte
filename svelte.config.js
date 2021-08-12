import vercel from '@sveltejs/adapter-vercel';
import sveltePreprocess from 'svelte-preprocess';

export default {
  kit: {
    adapter: vercel(),
    target: '#svelte'
  },
  preprocess: sveltePreprocess()
};
