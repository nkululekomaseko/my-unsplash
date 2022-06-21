import React from "react";
import { Stack, Modal, Text, TextInput, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";

type Props = {
  openModal: boolean;
  setOpenModal: (update: boolean) => void;
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
  });

  const handleCancelBtn = () => {
    form.reset();
    setOpenModal(false);
  };

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    form.validate();
    console.log(form.values);
    console.log(form.validate());
    form.onSubmit((values) =>
      console.log(`Form Values: ${JSON.stringify(values, null, 2)}`)
    );
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
