import {useEffect} from "react";
import {useDispatch, useSelector}from "react-redux";
import {ImageList, ImageListItem}from "@mui/material";
import {chooseBackground, fetchBackgrounds}from "../../redux/backgroundSlice";


const BackgroundImageItem = ({background, onClick}) => {
  return (
    <ImageListItem
      key={background.key}
      sx={{
        height: 150,
      }}
    >
      <img
        src={background.thumbnail}
        alt={background.key}
        loading="lazy"
        onClick={onClick}
        style={{cursor: "pointer"}}
      />
    </ImageListItem>
  )
};


const BackgroundImageList = () => {
  const dispatch = useDispatch();
  const {backgrounds}= useSelector((state) => state.background);

  const onClickBackground = (background) => {
    dispatch(chooseBackground(background));
  };

  useEffect(() => {
    dispatch(fetchBackgrounds());
  }, [dispatch]);

  return (
    <ImageList
      sx={{
        padding: 3,
        marginTop: 0,
        gap: 1,
      }}
      cols={1}
    >
      {
        backgrounds.map((background, key) => (
          <div key={key}>
            <BackgroundImageItem
              background={background}
              onClick={() => onClickBackground(background)}
            />
          </div>
        ))
      }
    </ImageList>
  );
};

export default BackgroundImageList;
