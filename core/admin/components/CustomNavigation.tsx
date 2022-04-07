import type { NavigationProps } from "@keystone-6/core/admin-ui/components";
import {
  ListNavItems,
  NavigationContainer,
  NavItem,
} from "@keystone-6/core/admin-ui/components";
import { gql, useQuery } from "@keystone-6/core/admin-ui/apollo";
import { useEffect } from "react";

const CustomNavigation = function ({
  authenticatedItem,
  lists,
}: NavigationProps) {
  const { data, error } = useQuery(gql`
    query {
      settings(take: 1) {
        id
      }
    }
  `);

  useEffect(() => {
    console.log(data, error);
  });

  return (
    <NavigationContainer authenticatedItem={authenticatedItem}>
      <ListNavItems lists={lists} />
      {data?.settings?.length && (
        <NavItem href={`/settings/${data.settings[0].id}`}>Settings</NavItem>
      )}
    </NavigationContainer>
  );
};

export default CustomNavigation;
