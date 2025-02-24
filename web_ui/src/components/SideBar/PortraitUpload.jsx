import {useState}from "react";
import {
  Box,
  ButtonGroup,
  IconButton,
  ImageList,
} from "@mui/material";
import {
  CheckOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
  PlayArrowOutlined,
} from "@mui/icons-material";
import ImageBar from "../Common/ImageBar";
import {clearPortrait, merge, removeBackgroundStream} from "../../redux/portraitSlice";
import {useDispatch, useSelector} from "react-redux";

const PortraitUpload = () => {
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const dispatch = useDispatch();
  const {bg_removed_portrait}= useSelector(state => state.portrait);
  const {background}= useSelector(state => state.background);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageB64Url = URL.createObjectURL(file);
      setImage(imageB64Url);
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImageFile(null);
    dispatch(clearPortrait());
  };

  const handleRemoveBackground = () => {
    if (imageFile) {
      dispatch(removeBackgroundStream(imageFile));
    }
  };

  const handleMerge = () => {
    dispatch(merge(background.key));
  };

  return (
    <Box>
      <ImageList
        sx={{
          padding: 3,
          marginBottom: 0,
        }}
        cols={1}
      >
        <ImageBar
          image={image}
          sx={{
            height: 150,
            maxWidth: 250,
            objectFit: "cover",
          }}
          message="Upload Portrait"
        />
        <br/>
        <ButtonGroup
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton component="label" disabled={!!image}>
            <CloudUploadOutlined/>
            <input
              type="file"
              accept="image/*"
              hidden
              value=""
              onChange={handleImageUpload}
            />
          </IconButton>
          <IconButton onClick={handleRemoveImage} disabled={!image}>
            <DeleteOutlined/>
          </IconButton>
          <IconButton onClick={handleRemoveBackground} disabled={!(image && !bg_removed_portrait)}>
            <PlayArrowOutlined />
          </IconButton>
          <IconButton onClick={handleMerge} disabled={!(background.link && bg_removed_portrait)}>
            <CheckOutlined />
          </IconButton>
        </ButtonGroup>
      </ImageList>
    </Box>
  )
}

export default PortraitUpload;
