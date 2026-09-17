/* eslint-disable sonarjs/no-nested-template-literals */
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Link,
  NativeSelect,
  Spinner,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from 'lib/api/client';
import {
  occasions,
  occasionsText,
} from 'lib/components/GreetingsTemplates/types';
import ControlledInput from 'lib/components/shared/form/ControlledInput';
import FormControlWrapper from 'lib/components/shared/form/FormControlWrapper';
import ModalWrapper from 'lib/components/shared/ModalWrapper';
import { toaster } from 'lib/components/ui/toaster';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { CreateFormType } from './models';
import { createFormRequestScheme } from './models';

const initialValues: CreateFormType = {
  name: '',
  occasion: '',
  customMessage: '',
  from: '',
};

const Create = () => {
  const { open, onOpen, onClose } = useDisclosure();

  const [generatedUrl, setGeneratedUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const {
    watch,
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreateFormType>({
    defaultValues: initialValues,
    mode: 'onChange',
    resolver: zodResolver(createFormRequestScheme),
  });
  const values = watch();
  const { name, occasion, customMessage, from } = values;

  const encryptText = (text: string) =>
    api.get('api/encrypt', { searchParams: { text } }).json<string>();

  const processString = async (text: string) =>
    decodeURI(await encryptText(text));

  const greetingRoute = async () => {
    return `/greetings/enc/${occasion}?name=${await processString(name)}${
      customMessage ? `&message=${await processString(customMessage)}` : ''
    }${from ? `&from=${await processString(from)}` : ''}`;
  };

  const generateLink = async () => {
    if (!isValid) {
      return;
    }
    setLoading(true);
    onOpen();
    try {
      const updateGeneratedUrl = await greetingRoute();
      setGeneratedUrl(updateGeneratedUrl);
    } catch {
      toaster.create({
        description: 'Failed to generate greeting link. Please try again.',
        type: 'error',
        closable: true,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(
        `${document.location.protocol}//${document.location.host}${generatedUrl}`,
      )
      .then(() => {
        toaster.create({
          description: 'Link Copied! Now you just have to share it!',
          type: 'success',
          closable: true,
        });
      });
  };

  const handleRoutePreview = () => {
    window.open(generatedUrl, '_blank');
  };

  return (
    <Grid gap={6}>
      <Heading letterSpacing={1} size="3xl">
        Create a Greeting
      </Heading>

      <FormControlWrapper
        isRequired
        label="Occasion"
        errorText={errors.occasion?.message}
      >
        <NativeSelect.Root size="lg">
          <NativeSelect.Field
            {...register('occasion')}
            placeholder="what's the occasion?"
            style={{ textTransform: 'capitalize' }}
          >
            {occasionsText.map((occasionText: string, index: number) => {
              return (
                <option
                  style={{ textTransform: 'capitalize' }}
                  key={occasionText}
                  value={occasions[index]}
                >
                  {occasionText}
                </option>
              );
            })}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </FormControlWrapper>

      <ControlledInput
        {...register('name')}
        errorText={errors.name?.message}
        isRequired
        label="Name"
        placeholder="who do you want to sent it for?"
      />

      <ControlledInput
        {...register('customMessage')}
        label="Custom Message"
        placeholder="any custom message?"
        errorText={errors.customMessage?.message}
      />

      <ControlledInput
        {...register('from')}
        label="From"
        placeholder="wanna include your name as a sender?"
        errorText={errors.from?.message}
      />

      <Button
        // disabled={!isDirty || !isValid}
        onClick={handleSubmit(generateLink)}
        colorPalette="green"
      >
        Generate!
      </Button>

      <ModalWrapper
        open={open}
        onClose={onClose}
        size="xs"
        header={loading ? 'Please Wait...' : 'Nice!'}
        body={
          loading ? (
            <Spinner size="lg" />
          ) : (
            <Grid gap={4}>
              <Box textAlign="center">
                <Image
                  src="/Online friends-pana.svg"
                  alt="illustration"
                  height={120}
                  marginX="auto"
                />
                <Link
                  fontSize="xs"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://storyset.com/"
                >
                  Illustration by Freepik Storyset
                </Link>
              </Box>

              <Text>Here is the greeting page generated:</Text>

              <Button onClick={handleCopyLink} colorPalette="teal">
                Copy Link
              </Button>

              <Button onClick={handleRoutePreview} colorPalette="yellow">
                Preview
              </Button>
            </Grid>
          )
        }
        footer={<Button onClick={onClose}>Back</Button>}
      />
    </Grid>
  );
};

export default Create;
