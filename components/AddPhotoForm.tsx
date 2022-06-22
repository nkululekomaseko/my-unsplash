import React, { useState, useEffect } from "react";
import { Stack, Modal, Text, TextInput, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import { UnsplashSchema } from "../prisma/unsplash";
import axios from "axios";

type Props = {
  openModal: boolean;
  setOpenModal: (update: boolean) => void;
};

let unsplashURL: string | undefined = undefined;

const getAllUnsplash = async (): Promise<UnsplashSchema[] | null> => {
  if (!unsplashURL) return null;
  const unsplashResponse = await axios.get(unsplashURL);
  return unsplashResponse.data;
};

const createNewUnsplash = async (payload: UnsplashSchema) => {
  if (!unsplashURL) return null;
  const createUnsplashResponse = await axios.post(unsplashURL, { ...payload });
  return createUnsplashResponse.data;
};

const AddPhotoForm = (props: Props) => {
  const { openModal, setOpenModal } = props;
  const form = useForm({
    initialValues: {
      label: "",
      imageURL: "",
      password: "",
      confirmPassword: "",
    },
    validate: {
      label: (value) => {
        return value.length < 3 ? "Must have at least 3 letters" : null;
      },
      password: (value) => {
        if (value.length < 5) return "Must have at least 5 letters";
        // else if (!/[0-9]/.test(value)) return "Must include a number";
        // else if (!/[a-z]/.test(value)) return "Must include a lowercase letter";
        // else if (!/[A-Z]/.test(value))
        //   return "Must include an uppercase letter";
        // else if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(value))
        //   return "Must include a special symbol";
        else {
          return null;
        }
      },
      confirmPassword: (value, values) => {
        return value !== values.password ? "Passwords did not match" : null;
      },
    },
  });

  useEffect(() => {
    unsplashURL = `${window.location.origin}/api/unsplash`;
  }, []);

  const handleCancelBtn = () => {
    form.reset();
    setOpenModal(false);
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    form.validate();
    console.log(form.values);
    console.log(form.validate());
    if (!form.validate().hasErrors) {
      const submitResponseData = await createNewUnsplash({
        label: form.values.label,
        imageUrl: form.values.imageURL,
        password: form.values.password,
      });
      console.log(
        `submitResponse: ${JSON.stringify(submitResponseData, null, 2)}`
      );
    }
  };

  return (
    <>
      <Modal opened={openModal} onClose={() => setOpenModal(false)}>
        <Text>Add a new photo</Text>
        <form onSubmit={handleFormSubmit}>
          <Stack>
            <TextInput
              type="text"
              label="Label"
              required
              {...form.getInputProps("label")}
            />
            <TextInput
              type="text"
              label="Photo URL"
              required
              {...form.getInputProps("imageURL")}
            />
            <TextInput
              type="password"
              label="Password"
              required
              {...form.getInputProps("password")}
            />
            <TextInput
              type="password"
              label="Confirm Password"
              required
              {...form.getInputProps("confirmPassword")}
            />
          </Stack>
          <Group position="right" mt="md">
            <Button onClick={handleCancelBtn}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
};

export default AddPhotoForm;
