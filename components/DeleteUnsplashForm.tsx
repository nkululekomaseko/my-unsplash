import React, { useEffect, useState } from "react";
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
import { createNewUnsplash, deleteUnsplash } from "../lib/apiRequest";
import { showNotification } from "@mantine/notifications";

type Props = {
  reloadData: (filterQuery?: string) => void;
};

const DeleteUnsplashForm = (
  props: Props
): {
  setOpenDeleteUnsplashForm: (open: boolean) => void;
  setImageId: (imageId: string) => void;
  DeleteUnsplashFormRender: JSX.Element;
} => {
  const { reloadData } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [openDeleteUnsplashForm, setOpenDeleteUnsplashForm] =
    useState<boolean>(false);
  const [imageId, setImageId] = useState<string>("");

  const form = useForm({
    initialValues: {
      password: "",
    },
  });

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    form.validate();
    setLoading(true);
    const deleteUnsplasResponseData = await deleteUnsplash({
      imageId,
      candidatePassword: form.values.password,
    });
    setLoading(false);

    console.log(
      "Image Delete Response: ",
      JSON.stringify(deleteUnsplasResponseData, null, 2)
    );

    if (!!deleteUnsplasResponseData?.authorized) {
      showNotification({
        title: "Image Deleted Successfully",
        message: `Image "${deleteUnsplasResponseData?.data.label}" has been uploaded successfully`,
        autoClose: 2000,
        color: "green",
      });
      reloadData();
    } else {
      showNotification({
        title: "Error - Incorrect Password",
        message: `Unable to delete image`,
        color: "red",
        autoClose: 5000,
      });
    }

    form.reset();
    setOpenDeleteUnsplashForm(false);
  };

  return {
    setOpenDeleteUnsplashForm,
    setImageId,
    DeleteUnsplashFormRender: (
      <>
        <Modal
          opened={openDeleteUnsplashForm}
          onClose={() => setOpenDeleteUnsplashForm(false)}
          sx={{
            ".mantine-Modal-close": {
              display: "none",
            },
          }}
        >
          <Text
            color="#333333"
            sx={{ marginBottom: "20px", fontSize: "24px", fontWeight: 500 }}
          >
            Are you sure?
          </Text>
          <form onSubmit={handleFormSubmit}>
            <Stack>
              <TextInput
                type="password"
                label="Password"
                radius="md"
                size="md"
                required
                {...form.getInputProps("password")}
              />
            </Stack>
            <Group position="right" mt="md">
              <Button
                variant="subtle"
                color="gray"
                radius="md"
                onClick={() => setOpenDeleteUnsplashForm(false)}
              >
                Cancel
              </Button>
              <Button color="red" radius="md" type="submit">
                Delete
              </Button>
            </Group>
          </form>
          <LoadingOverlay visible={loading} />
        </Modal>
      </>
    ),
  };
};

export default DeleteUnsplashForm;
