import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Search } from "tabler-icons-react";
import { Box, Button, TextInput, Text } from "@mantine/core";

import AddPhotoForm from "../components/AddPhotoForm";
import { getAllUnsplash, deleteUnsplash } from "../lib/apiRequest";
import { useDebouncedValue } from "@mantine/hooks";
import { useEffect, useState } from "react";
import MasonryComponent from "../components/MasonryComponent";

export let unsplashURL: string | undefined = undefined;

const Home: NextPage = () => {
  const [openPhotoFormModal, setOpenPhotoFormModal] = useState<boolean>(false);
  const [unsplashData, setUnsplashData] = useState<any[] | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [debounced] = useDebouncedValue<string>(searchText, 200);

  const loadUnsplash = async (filterQuery?: string) => {
    const unsplashResponse = await getAllUnsplash(filterQuery);
    if (!!unsplashResponse) setUnsplashData(unsplashResponse);
  };

  useEffect(() => {
    unsplashURL = `${window.location.origin}/api/unsplash`;
    loadUnsplash();
  }, []);

  useEffect(() => {
    loadUnsplash(debounced);
  }, [debounced]);

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
              placeholder="Search by name"
              icon={<Search />}
              value={searchText}
              onChange={(event) => setSearchText(event.currentTarget.value)}
              radius={12}
              size="lg"
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
        reloadData={loadUnsplash}
      />
    </>
  );
};

export default Home;
