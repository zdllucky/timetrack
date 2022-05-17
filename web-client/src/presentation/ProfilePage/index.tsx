import Scaffold from "../Scaffold";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useStackNavigator } from "presentation/Router";
import { BottomNavigationBar } from "../TabsProvider";

const ProfilePage: FC = () => {
  const { t } = useTranslation("translations");
  const { canPop } = useStackNavigator();

  return (
    <Scaffold
      bottomBar={canPop ? undefined : <BottomNavigationBar />}
    >{t`profile`}</Scaffold>
  );
};

export default ProfilePage;
