import type { NextPage } from "next";
import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Search } from "tabler-icons-react";
import { Box, Button, TextInput } from "@mantine/core";
import { Masonry } from "@mui/lab";
import AddPhotoForm from "../components/AddPhotoForm";
import { useState } from "react";
import { getAllUnsplash } from "../components/apiRequest";

export let unsplashURL: string | undefined = undefined;

const Home: NextPage = () => {
  const [openPhotoFormModal, setOpenPhotoFormModal] = useState<boolean>(false);
  const [unsplashData, setUnsplashData] = useState(null);

  useEffect(() => {
    unsplashURL = `${window.location.origin}/api/unsplash`;
  }, []);

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
          <Masonry columns={3} spacing={4}>
            {[
              "https://image-uploader-tool.herokuapp.com/api/image/unsplash/vjn4gmaffgyt8cq3dgss",
              "https://image-uploader-tool.herokuapp.com/api/image/unsplash/rt0ua72ertglkp0vgxyb",
            ].map((link, index) => {
              return (
                <Box key={index} className={styles.masonry_image_box}>
                  <img
                    className={styles.masonry_image}
                    src={link}
                    alt="alt"
                    width="100%"
                  />
                  {/* <Button>Hello</Button> */}
                </Box>
              );
            })}
          </Masonry>
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
