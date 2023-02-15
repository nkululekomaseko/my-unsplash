import React, { useState } from "react";
import {
  Stack,
  Modal,
  Text,
  TextInput,
  Group,
  Button,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { createNewUnsplash } from "../lib/apiRequest";
import { showNotification } from "@mantine/notifications";

type Props = {
  openModal: boolean;
  setOpenModal: (update: boolean) => void;
  reloadData: (filterQuery?: string) => void;
};

const AddPhotoForm = (props: Props) => {
  const { openModal, setOpenModal, reloadData } = props;
  const [loading, setLoading] = useState<boolean>(false);

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

  const handleModalClose = () => {
    form.reset();
    setOpenModal(false);
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    form.validate();
    if (!form.validate().hasErrors) {
      setLoading(true);
      const submitResponseData = await createNewUnsplash({
        label: form.values.label,
        imageUrl: form.values.imageURL,
        password: form.values.password,
      });
      setLoading(false);
      console.log(
        `submitResponse: ${JSON.stringify(submitResponseData, null, 2)}`
      );
      if (!!submitResponseData) {
        showNotification({
          title: "Image Uploaded Successfully",
          message: `Image ${form.values.label} has been uploaded successfully`,
          autoClose: 2000,
        });
        reloadData();
        handleModalClose();
      }
    }
  };

  return (
    <>
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        sx={{
          ".mantine-Modal-close": {
            display: "none",
          },
        }}
      >
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
            <Button
              variant="subtle"
              color="gray"
              radius="md"
              onClick={handleModalClose}
            >
              Cancel
            </Button>
            <Button color="green" radius="md" type="submit">
              Submit
            </Button>
          </Group>
        </form>
        <LoadingOverlay visible={loading} />
      </Modal>
    </>
  );
};

export default AddPhotoForm;
