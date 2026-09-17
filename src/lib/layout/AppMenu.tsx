import {
  Box,
  Drawer,
  Flex,
  Heading,
  IconButton,
  Image,
  Link,
  Portal,
  Spinner,
  Text,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useColorMode } from 'lib/components/ui/color-mode';
import { APP_NAME } from 'pages/_document';
import { useEffect, useState } from 'react';
import { BiMenu } from 'react-icons/bi';

type AppsType = {
  name: string;
  description?: string;
  icon: string;
  url: string;
};

const PROJECT_LIST_URL = `${process.env.NEXT_PUBLIC_PROJECTS_LIST_URL}`;

const AppMenu = () => {
  const { open, onOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  const [isBiggerThanMobile] = useMediaQuery(['(min-width: 480px)']);
  const [apps, setApps] = useState<Array<AppsType>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${PROJECT_LIST_URL}`)
      .then((res) => res.json())
      .then((result) => {
        setApps(result);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <IconButton
        marginLeft={2}
        aria-label="app-menu"
        background="none"
        onClick={onOpen}
        variant="ghost"
      >
        <BiMenu />
      </IconButton>
      <Drawer.Root
        placement={isBiggerThanMobile ? 'end' : 'top'}
        open={open}
        onOpenChange={(e) => {
          if (!e.open) {
            onClose();
          }
        }}
      >
        <Portal>
          <Drawer.Backdrop />

          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title>
                  <Heading size="xs">More from sznm.dev</Heading>
                </Drawer.Title>
              </Drawer.Header>

              <Drawer.Body>
                {loading && <Spinner />}
                {apps
                  .filter((app) => app.name !== APP_NAME)
                  .map(({ name, icon, url, description }) => (
                    <Link
                      key={name}
                      href={url}
                      _hover={{ textDecoration: 'none' }}
                    >
                      <Flex
                        marginY={4}
                        alignItems="center"
                        padding={2}
                        borderRadius={12}
                        _hover={{
                          backgroundColor:
                            colorMode === 'light' ? 'gray.200' : 'gray.600',
                        }}
                      >
                        <Image src={icon} width={12} alt="menu" />
                        <Box marginLeft={4}>
                          <Heading size="sm" fontFamily="body">
                            {name}
                          </Heading>
                          {description && (
                            <Text fontSize="xs">{description}</Text>
                          )}
                        </Box>
                      </Flex>
                    </Link>
                  ))}
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};

export default AppMenu;
