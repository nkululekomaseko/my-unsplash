import type { NextPage } from "next";
import { useState, useEffect, MouseEventHandler } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Search } from "tabler-icons-react";
import { Box, Button, TextInput } from "@mantine/core";
import { Masonry } from "@mui/lab";
import AddPhotoForm from "../components/AddPhotoForm";
import { getAllUnsplash, deleteUnsplash } from "../components/apiRequest";
import { useDebouncedValue } from "@mantine/hooks";

export let unsplashURL: string | undefined = undefined;

type Props = {
  unsplashData: any[] | null;
  reloadData: (filterQuery?: string) => void;
};

const MasonryComponent = (props: Props): JSX.Element => {
  const { unsplashData, reloadData } = props;
  if (!unsplashData || !unsplashData.length) return <></>;

  const handleDeleteBtnClick = async (imageId: string) => {
    console.log(`Image ID: ${imageId}`);
    const deleteUnsplasResponseData = await deleteUnsplash(imageId);
    if (deleteUnsplasResponseData) {
      reloadData();
    }
  };

  return (
    <Masonry columns={3} spacing={4}>
      {unsplashData.map((data) => {
        return (
          <Box key={data.id} className={styles.masonry_image_box}>
            <img
              className={styles.masonry_image}
              src={data.imageUrl}
              alt="alt"
              width="100%"
            />
            <Button
              value={data.id}
              className={styles.masonry_delete_btn}
              variant="outline"
              onClick={() => handleDeleteBtnClick(data.id)}
            >
              delete
            </Button>
          </Box>
        );
      })}
    </Masonry>
  );
};

const Home: NextPage = () => {
  const [openPhotoFormModal, setOpenPhotoFormModal] = useState<boolean>(false);
  const [unsplashData, setUnsplashData] = useState<any[] | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText] = useDebouncedValue<string>(searchText, 500);

  const loadUnsplash = async (filterQuery?: string) => {
    const unsplashResponse = await getAllUnsplash(filterQuery);
    if (!!unsplashResponse) setUnsplashData(unsplashResponse);
  };

  useEffect(() => {
    unsplashURL = `${window.location.origin}/api/unsplash`;
    loadUnsplash();
  }, []);

  useEffect(() => {
    loadUnsplash(debouncedSearchText);
  }, [debouncedSearchText]);

  return (
    <>
      <Box className={styles.container}>
        <Head>
          <title>My Unsplash</title>
          <meta
            name="Unsplash image uploads"
            content="Generated by create next app"
          />
        </Head>
        <nav className={styles.nav__container}>
          <Box className={styles.nav__left}>
            <Image
              width="138px"
              height="26px"
              src="/my_unsplash_logo.svg"
              alt="logo"
            />
            <TextInput
              className={styles.search__input}
              placeholder="Search by name"
              icon={<Search />}
              value={searchText}
              onChange={(event) => setSearchText(event.currentTarget.value)}
            />
          </Box>
          <Box>
            <Button
              onClick={() => setOpenPhotoFormModal(true)}
              className={styles.add_photo_btn}
            >
              Add a photo
            </Button>
          </Box>
        </nav>

        <Box className={styles.masonry_container}>
          <MasonryComponent
            unsplashData={unsplashData}
            reloadData={loadUnsplash}
          />
        </Box>
      </Box>
      <AddPhotoForm
        openModal={openPhotoFormModal}
        setOpenModal={setOpenPhotoFormModal}
      />
    </>
  );
};

export default Home;
