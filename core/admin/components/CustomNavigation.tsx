import type { NavigationProps } from "@keystone-6/core/admin-ui/components";
import {
  ListNavItems,
  NavigationContainer,
  NavItem,
} from "@keystone-6/core/admin-ui/components";
import { gql, useQuery } from "@keystone-6/core/admin-ui/apollo";

const CustomNavigation = function ({
  authenticatedItem,
  lists,
}: NavigationProps) {
  const { data } = useQuery(gql`
    query {
      settings(take: 1) {
        id
      }
    }
  `);

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
