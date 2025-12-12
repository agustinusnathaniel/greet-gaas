/* eslint-disable sonarjs/no-nested-template-literals */
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Link,
  Select,
  Spinner,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {
  occasions,
  occasionsText,
} from 'lib/components/GreetingsTemplates/types';
import ControlledInput from 'lib/components/shared/form/ControlledInput';
import FormControlWrapper from 'lib/components/shared/form/FormControlWrapper';
import ModalWrapper from 'lib/components/shared/ModalWrapper';
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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
    axios('/api/encrypt', { params: { text } }).then(
      (res) => res.data as string,
    );

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
    const updateGeneratedUrl = await greetingRoute();
    setGeneratedUrl(updateGeneratedUrl);
    setLoading(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(
        `${document.location.protocol}//${document.location.host}${generatedUrl}`,
      )
      .then(() => {
        toast({
          description: 'Link Copied! Now you just have to share it!',
          status: 'success',
          position: 'top',
          isClosable: true,
        });
      });
  };

  const handleRoutePreview = () => {
    window.open(generatedUrl, '_blank');
  };

  return (
    <Grid gap={6}>
      <Heading letterSpacing={1}>Create a Greeting</Heading>

      <FormControlWrapper
        isRequired
        label="Occasion"
        errorText={errors.occasion?.message}
      >
        <Select
          {...register('occasion')}
          isInvalid={!!errors.occasion?.message}
          placeholder="what's the occasion?"
          size="lg"
          textTransform="capitalize"
        >
          {occasionsText.map((occasionText: string, index: number) => {
            return (
              <Text
                style={{ textTransform: 'capitalize' }}
                key={occasionText}
                as="option"
                value={occasions[index]}
              >
                {occasionText}
              </Text>
            );
          })}
        </Select>
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
        colorScheme="green"
      >
        Generate!
      </Button>

      <ModalWrapper
        isOpen={isOpen}
        onClose={onClose}
        size="xs"
        header={loading ? 'Please Wait...' : 'Nice!'}
        body={
          loading ? (
            <Spinner size="lg" textAlign="center" />
          ) : (
            <Grid gap={4}>
              <Box textAlign="center">
                <Image
                  src="/Online friends-pana.svg"
                  alt="illustration"
                  height={120}
                  marginX="auto"
                />
                <Link fontSize="xs" isExternal href="https://storyset.com/">
                  Illustration by Freepik Storyset
                </Link>
              </Box>

              <Text>Here is the greeting page generated:</Text>

              <Button onClick={handleCopyLink} colorScheme="teal">
                Copy Link
              </Button>

              <Button onClick={handleRoutePreview} colorScheme="yellow">
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
