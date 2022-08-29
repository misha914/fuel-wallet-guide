import { Box, Button, Flex, Heading, Icon, Text } from "@fuel-ui/react";
import { useEffect, useState } from "react";
import { AssetList } from "~/systems/Asset";
import { Layout } from "~/systems/Core";

export function Home() {
  const [ isFirstLoading, setIsFirstLoading ] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsFirstLoading(false), 2000);
  }, []);

  return (
    <Layout title="Home" isLoading={isFirstLoading}>
      <Layout.TopBar />
      <Layout.Content>
        <Flex
          direction="column"
          css={{
            height: '100%'
          }}
        >
          <Box css={{
            border: '1px solid $gray6',
            borderRadius: 10,
            padding: 10,
            marginBottom: '$6',
            flexShrink: 0
          }}>Acccount Overview</Box>
          <Flex css={{
            marginBottom: '$6',
            flexShrink: 0
          }}>
            <Button
              isDisabled={isFirstLoading}
              css={{
                borderRadius: 40,
                marginRight: '$1',
                flex: 1,
                py: '$5'
              }}
            >
              Send
            </Button>
            <Button
              size="sm"
              isDisabled={isFirstLoading}
              variant="outlined"
              color="gray"
              css={{
                borderRadius: 40,
                marginLeft: '$1',
                flex: 1,
                py: '$5'
              }}
            >
              Receive
            </Button>
          </Flex>
          <Flex
            css={{
              marginBottom: '$5',
              flexShrink: 0
            }}
          >
            <Icon icon="Coins" color="accent9" size={22} weight="regular"/>
            <Heading as="h4" css={{ my: '0px', marginLeft: 8 }} color="white">Assets</Heading>
          </Flex>
          { isFirstLoading ? (
            <AssetList.Loading items={4} />
          ) : (
            <Flex css={{
              flex: '1 0',
            }}>
              <AssetList.Empty />
            </Flex>
          ) }
        </Flex>
      </Layout.Content>
    </Layout>
  );
}
