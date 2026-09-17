import { IconButton } from '@chakra-ui/react';
import { useColorMode } from 'lib/components/ui/color-mode';
import { RiMoonFill, RiSunLine } from 'react-icons/ri';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton aria-label="theme toggle" onClick={toggleColorMode}>
      {colorMode === 'light' ? <RiMoonFill /> : <RiSunLine />}
    </IconButton>
  );
};

export default ThemeToggle;
