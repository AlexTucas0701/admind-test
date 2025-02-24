import {useSelector} from "react-redux";
import ImageBar from "../Common/ImageBar";
import VAR from "../../constants/var";

const StatusBar = () => {
  const {background}= useSelector(state => state.background);
  const {bg_remove_status, bg_removed_portrait}= useSelector(state => state.portrait);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ImageBar
        image={background?.thumbnail}
        message="Select background"
        sx={{
          width: 200,
          height: 150,
          objectFit: "cover",
        }}
      />
      <ImageBar
        image={bg_removed_portrait}
        message={!!bg_removed_portrait || bg_remove_status || VAR.UPLOAD_AND_PROCESS_THE_PORTRAIT}
        sx={{
          width: 200,
          height: 150,
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default StatusBar;
