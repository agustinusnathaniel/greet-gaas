import {
  createSystem,
  defaultConfig,
  defineRecipe,
  defineSlotRecipe,
  defineTokens,
} from '@chakra-ui/react';

const buttonRecipe = defineRecipe({
  base: {
    borderRadius: 24,
  },
});

const inputRecipe = defineRecipe({
  base: {
    borderRadius: 24,
  },
});

const nativeSelectSlotRecipe = defineSlotRecipe({
  slots: ['root', 'field', 'indicator'],
  base: {
    field: {
      borderRadius: 24,
    },
  },
});

const tokens = defineTokens({
  fonts: {
    heading: { value: 'Caveat, sans-serif' },
    body: { value: 'Outfit, sans-serif' },
  },
});

export const system = createSystem(defaultConfig, {
  theme: {
    tokens,
    recipes: {
      button: buttonRecipe,
      input: inputRecipe,
    },
    slotRecipes: {
      nativeSelect: nativeSelectSlotRecipe,
    },
  },
});

export default system;
