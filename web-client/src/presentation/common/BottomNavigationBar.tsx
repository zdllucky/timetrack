import { FC } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArchiveIcon from "@mui/icons-material/Archive";

const BottomNavigationBar: FC = () => (
  <BottomNavigation showLabels value={1} onChange={(event, newValue) => {}}>
    <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
    <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
    <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
  </BottomNavigation>
);

export default BottomNavigationBar;
