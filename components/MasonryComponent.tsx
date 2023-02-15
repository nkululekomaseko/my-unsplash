import { Box, Button, Text } from "@mantine/core";
import { Masonry } from "@mui/lab";
import { deleteUnsplash } from "../lib/apiRequest";
import styles from "../styles/Home.module.css";
import DeleteUnsplashForm from "./DeleteUnsplashForm";

type Props = {
  unsplashData: any[] | null;
  reloadData: (filterQuery?: string) => void;
};

const MasonryComponent = (props: Props): JSX.Element => {
  const { unsplashData, reloadData } = props;
  if (!unsplashData || !unsplashData.length) return <></>;

  const { setOpenDeleteUnsplashForm, setImageId, DeleteUnsplashFormRender } =
    DeleteUnsplashForm({ reloadData });

  const handleDeleteBtnClick = async (imageId: string) => {
    setImageId(imageId);
    setOpenDeleteUnsplashForm(true);
  };

  return (
    <>
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
              <Text className={styles.masonry_img_label}>{data.label}</Text>
            </Box>
          );
        })}
      </Masonry>
      {DeleteUnsplashFormRender}
    </>
  );
};

export default MasonryComponent;
