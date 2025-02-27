import React from "react";
import { useTranslation } from "next-i18next";
import { Box, Container, Flex, Text, VStack, SimpleGrid } from "@chakra-ui/react";

import { CommunityStat } from "types";
import {
  TWITTER_URL,
  GITHUB_URL,
  TELEGRAM_URL,
  DISCORD_URL,
  YOUTUBE_URL,
  REDDIT_URL,
  LINKEDIN_URL,
} from "constants/links";
import Image from "next/image";

type Tile = {
  key: string;
  title: string;
  icon: string;
  link: string;
  fallBackNum: string;
  userAlias: string;
};

const titleFixedData: Tile[] = [
  {
    key: "discord",
    title: "Discord",
    icon: "/community/icons/discord.svg",
    link: DISCORD_URL,
    fallBackNum: "4500+",
    userAlias: "members",
  },
  {
    key: "youtube",
    title: "YouTube",
    icon: "/community/icons/youtube.svg",
    link: YOUTUBE_URL,
    fallBackNum: "1.67k+",
    userAlias: "subscribers",
  },
  {
    key: "twitter",
    title: "Twitter",
    icon: "/community/icons/twitter.svg",
    link: TWITTER_URL,
    fallBackNum: "13.5k+",
    userAlias: "followers",
  },
  {
    key: "telegram",
    title: "Telegram",
    icon: "/community/icons/telegram.svg",
    link: TELEGRAM_URL,
    fallBackNum: "4.6k+",
    userAlias: "members",
  },
  {
    key: "reddit",
    title: "Reddit",
    icon: "/community/icons/reddit.svg",
    link: REDDIT_URL,
    fallBackNum: "141",
    userAlias: "members",
  },
  {
    key: "github",
    title: "GitHub",
    icon: "/community/icons/github.svg",
    link: GITHUB_URL,
    fallBackNum: "14",
    userAlias: "contributors",
  },
  {
    key: "linkedin",
    title: "LinkedIn",
    icon: "/community/icons/linkedin.svg",
    link: LINKEDIN_URL,
    fallBackNum: "891",
    userAlias: "followers",
  },
];

const tilesData: Tile[] = [
  {
    key: "Shardeum_Community",
    title: "Shardeum Community",
    icon: "/community/icons/telegram.svg",
    link: "https://t.me/shardians",
    fallBackNum: "",
    userAlias: "members",
  },
  {
    key: "Shardeum_Discussion_Telegram",
    title: "Shardeum Discussion Telegram",
    icon: "/community/icons/telegram.svg",
    link: "https://t.me/ShardeumBlockchain",
    fallBackNum: "",
    userAlias: "members",
  },
  {
    key: "Shardeum_Academy",
    title: "Shardeum Academy",
    icon: "/community/icons/telegram.svg",
    link: "https://t.me/shardeumacademy",
    fallBackNum: "",
    userAlias: "members",
  },
  {
    key: "Shardeum_community",
    title: "Shardeum community",
    icon: "/community/icons/telegram.svg",
    link: "https://t.me/shardians",
    fallBackNum: "",
    userAlias: "members",
  },
  {
    key: "Russian_Telegram",
    title: "Russian Telegram",
    icon: "/community/icons/telegram.svg",
    link: "t.me/Shardeum_ru",
    fallBackNum: "",
    userAlias: "members",
  },
  {
    key: "Ukraininan_Telegram",
    title: "Ukraininan Telegram",
    icon: "/community/icons/telegram.svg",
    link: "t.me/shardeum_ua",
    fallBackNum: "",
    userAlias: "members",
  },
  {
    key: "Indonesian_Telegram",
    title: "Indonesian Telegram",
    icon: "/community/icons/telegram.svg",
    link: "https://t.me/shardeumid",
    fallBackNum: "",
    userAlias: "members",
  },
  {
    key: "Shardeum_Telegram_Tamil",
    title: "Shardeum Telegram Tamil",
    icon: "/community/icons/telegram.svg",
    link: "https://t.me/shardeumtamil",
    fallBackNum: "",
    userAlias: "members",
  },
  {
    key: "Shardeum_Tamil_Annoucements",
    title: "Shardeum Tamil Annoucements ",
    icon: "/community/icons/telegram.svg",
    link: "https://t.me/shardeum_tamil",
    fallBackNum: "",
    userAlias: "members",
  },
  {
    key: "Shardeum_Africa",
    title: "Shardeum Africa",
    icon: "/community/icons/telegram.svg",
    link: "https://t.me/ShardeumAfrica",
    fallBackNum: "",
    userAlias: "members",
  },
  {
    key: "Turkish_Telegram",
    title: "Turkish Telegram",
    icon: "/community/icons/telegram.svg",
    link: "https://t.me/shardeumturkey",
    fallBackNum: "",
    userAlias: "members",
  },
  {
    key: "Shardians_YT",
    title: "Shardians YT",
    icon: "/community/icons/youtube.svg",
    link: "https://www.youtube.com/c/Shardians",
    fallBackNum: "",
    userAlias: "subscribers",
  },
  {
    key: "Shardeum_Academy_YT",
    title: "Shardeum Academy YT",
    icon: "/community/icons/youtube.svg",
    link: "https://www.youtube.com/channel/UCGC1cKfj1Z6zJp-OODD6ZXA",
    fallBackNum: "",
    userAlias: "subscribers",
  },
  {
    key: "Shardeum_YT",
    title: "Shardeum YT",
    icon: "/community/icons/youtube.svg",
    link: "https://www.youtube.com/channel/UCO20LJZBF-lYbc6PWVvwkMA",
    fallBackNum: "",
    userAlias: "subscribers",
  },
  {
    key: "Shardeum_Africa",
    title: "Shardeum Africa",
    icon: "/community/icons/twitter.svg",
    link: "https://twitter.com/ShardeumAfrica",
    fallBackNum: "",
    userAlias: "followers",
  },
  {
    key: "Shardeum",
    title: "Shardeum",
    icon: "/community/icons/twitter.svg",
    link: "https://twitter.com/shardeum",
    fallBackNum: "",
    userAlias: "followers",
  },
  {
    key: "Documenting_SHM",
    title: "Documenting SHM",
    icon: "/community/icons/twitter.svg",
    link: "https://twitter.com/DocumentingSHM/",
    fallBackNum: "",
    userAlias: "followers",
  },
  {
    key: "Shardeum_Times",
    title: "Shardeum Times",
    icon: "/community/icons/twitter.svg",
    link: "https://twitter.com/shardeumtimes",
    fallBackNum: "",
    userAlias: "followers",
  },
  {
    key: "Shardeum_Memes",
    title: "Shardeum Memes",
    icon: "/community/icons/twitter.svg",
    link: "https://twitter.com/shardeummemes",
    fallBackNum: "",
    userAlias: "followers",
  },
  {
    key: "Shardeum_Academy",
    title: "Shardeum Academy",
    icon: "/community/icons/twitter.svg",
    link: "https://twitter.com/shardeumacademy",
    fallBackNum: "",
    userAlias: "followers",
  },
  {
    key: "Shardeum_Russia_YouTube",
    title: "Shardeum Russia YouTube",
    icon: "/community/icons/youtube.svg",
    link: "https://youtube.com/channel/UCi8U7RaQIHuenNCYHrHOoqQ",
    fallBackNum: "",
    userAlias: "subscribers",
  },
  {
    key: "Shardeum_Community",
    title: "Shardeum Community",
    icon: "/community/icons/twitter.svg",
    link: "https://twitter.com/shardeum_org",
    fallBackNum: "",
    userAlias: "followers",
  },
  {
    key: "shardeum_swap",
    title: "shardeum swap",
    icon: "/community/icons/twitter.svg",
    link: "https://twitter.com/ShardeumSwap",
    fallBackNum: "",
    userAlias: "followers",
  },
  {
    key: "Shardeum_Nigeria",
    title: "Shardeum Nigeria",
    icon: "/community/icons/twitter.svg",
    link: "https://twitter.com/ShardeumNigeria",
    fallBackNum: "",
    userAlias: "followers",
  },
  {
    key: "Shardeum_Twitter_Communities",
    title: "Shardeum (Twitter Communities)",
    icon: "/community/icons/twitter.svg",
    link: "https://twitter.com/i/communities/1515268176610684934",
    fallBackNum: "",
    userAlias: "followers",
  },
];

const CommunityTiles = ({ communityStats }: { communityStats: CommunityStat[] }) => {
  const { t: pageTranslation } = useTranslation("page-community");

  const handleTileClick = (url: string) => {
    window.open(url, "_blank"); //to open new page
  };

  const communityStatsMap = communityStats?.reduce((result: any, item) => {
    result[item.key] = item.followerCount;
    return result;
  }, {});

  return (
    <Flex bg="brand.white" as="section">
      <Container
        maxW="container.xl"
        mx="auto"
        px={{ base: 6, sm: 6, md: 6, lg: 6, xl: 0 }}
        pt={{ base: 6, lg: 16 }}
      >
        <Box>
          <VStack spacing={2} width="100%" alignItems="start">
            <Text
              as="h3"
              textAlign="left"
              lineHeight="normal"
              fontSize={{ base: "3xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              width="100%"
              color="brand.grey-90"
            >
              {pageTranslation("page-community-join-community-h1")}
            </Text>
            <Box maxW={{ base: "md", md: "full" }}>
              <Text
                fontSize={{ base: "md", lg: "md" }}
                textAlign="left"
                lineHeight={{ base: "7", md: "8" }}
                color="brand.grey-80"
                mb="5"
              >
                {pageTranslation("page-community-join-community-description")}
              </Text>
            </Box>

            <SimpleGrid spacing={6} columns={{ base: 2, sm: 2, md: 3, lg: 4 }} w="100%">
              {titleFixedData?.map((tile) => (
                <Box
                  key={tile.key}
                  display="flex"
                  flexDir="column"
                  cursor="pointer"
                  overflow="hidden"
                  bgColor="brand.white"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  p={{ base: "3", sm: "4", lg: "5" }}
                  pb={{ base: "4", sm: "6", lg: "8" }}
                  // w={{ base: "170px", sm: "200px", md: "200px", lg: "300px" }}
                  border={"1px solid"}
                  borderColor={"brand.grey-70"}
                  _hover={{
                    bgColor: "brand.grey-10",
                  }}
                  onClick={() => handleTileClick(tile.link)}
                >
                  <Image src={tile.icon} alt={tile.key} width={32} height={32} />
                  <Text
                    color={"brand.grey-80"}
                    fontSize={{ base: "md", sm: "md", lg: "lg" }}
                    fontWeight={"bold"}
                  >
                    {pageTranslation(`page-community-${tile.key}`) || tile.title}
                  </Text>

                  <Text
                    color={"brand.grey-80"}
                    fontSize={{ base: "sm", sm: "sm", lg: "sm" }}
                    fontWeight={"normal"}
                  >
                    {communityStatsMap?.[tile.key] || tile.fallBackNum}{" "}
                    {pageTranslation(`page-community-join-${tile.userAlias}`) || tile.userAlias}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>

        <Box style={{ marginTop: "50px" }}>
          <VStack spacing={2} width="100%" alignItems="start">
            <Text
              as="h3"
              textAlign="left"
              lineHeight="normal"
              fontSize={{ base: "3xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              width="100%"
              color="brand.grey-90"
            >
              {pageTranslation("page-community-join-community-h1")}
            </Text>
            <Box maxW={{ base: "md", md: "full" }}>
              <Text
                fontSize={{ base: "md", lg: "md" }}
                textAlign="left"
                lineHeight={{ base: "7", md: "8" }}
                color="brand.grey-80"
                mb="5"
              >
                {pageTranslation("page-community-join-community-description")}
              </Text>
            </Box>

            <SimpleGrid spacing={6} columns={{ base: 2, sm: 2, md: 3, lg: 4 }} w="100%">
              {tilesData?.map((tile) => (
                <Box
                  key={tile.key}
                  display="flex"
                  flexDir="column"
                  cursor="pointer"
                  overflow="hidden"
                  bgColor="brand.white"
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  p={{ base: "3", sm: "4", lg: "5" }}
                  pb={{ base: "4", sm: "6", lg: "8" }}
                  // w={{ base: "170px", sm: "200px", md: "200px", lg: "300px" }}
                  border={"1px solid"}
                  borderColor={"brand.grey-70"}
                  _hover={{
                    bgColor: "brand.grey-10",
                  }}
                  onClick={() => handleTileClick(tile.link)}
                >
                  <Image src={tile.icon} alt={tile.key} width={32} height={32} />
                  <Text
                    color={"brand.grey-80"}
                    fontSize={{ base: "md", sm: "md", lg: "lg" }}
                    fontWeight={"bold"}
                  >
                    {pageTranslation(`page-community-${tile.key}`) || tile.title}
                  </Text>

                  <Text
                    color={"brand.grey-80"}
                    fontSize={{ base: "sm", sm: "sm", lg: "sm" }}
                    fontWeight={"normal"}
                  >
                    {communityStatsMap?.[tile.key] || tile.fallBackNum}{" "}
                    {pageTranslation(`page-community-join-${tile.userAlias}`) || tile.userAlias}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
};

export default CommunityTiles;
