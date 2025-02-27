import { useContext, useState } from "react";
import type { GetServerSidePropsContext, InferGetServerSidePropsType, NextPage } from "next";

import { Button } from "@chakra-ui/react";
import ResponsiveHero from "@shm/components/sections/ResponsiveHero";
import JoinCommunity from "@shm/components/sections/JoinCommunity";
import ProjectsList from "@shm/components/sections/explore/ProjectsList";
import TrendingProjects from "@shm/components/sections/explore/TrendingProjects";
import NewestProjects from "@shm/components/sections/explore/NewProjects";
import { useTranslation } from "next-i18next";

import { getSession, useSession } from "next-auth/react";
import { getSHMProjects, getUserUpvotedProjects } from "utils/api";
import { upvoteProject } from "services/explore.service";
import SigninContext from "context/signin-window.context";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { useRouter } from "next/router";

// define page props type
export type ExplorePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

export const getServerSideProps = async ({ req, locale }: GetServerSidePropsContext) => {
  const session = await getSession({ req });

  const { projects, categories } = await getSHMProjects();
  const upvotedProjectsData = await getUserUpvotedProjects(session?.user?.id || "");
  return {
    // Will be passed to the page component as props
    props: {
      ...(await serverSideTranslations(locale as string, ["common", "page-alphanet"])),
      projects,
      categories,
      upvotedProjectIds: upvotedProjectsData?.upvotedProjectIds ?? [],
      sessionObject: session,
    },
  };
};

const Explore: NextPage<ExplorePageProps> = ({
  projects = [],
  categories = {},
  upvotedProjectIds = [],
  sessionObject,
}: ExplorePageProps) => {
  const router = useRouter();
  const { t: pageTranslation } = useTranslation(["page-alphanet"]);
  const { t: commonTranslation } = useTranslation(["common"]);

  // to open signin window
  const { setPopup } = useContext(SigninContext);
  // get session from hook
  const { data: session } = useSession();
  // if user was previously not signed in, but has signed in now, do a reload
  if (!sessionObject && session) router.reload();

  // const { data: sessionData } = useSession();

  // convert server props into state
  const [projectsState, setProjectsState] = useState(projects);
  const [projectSort, setProjectSort] = useState(projects);
  const [projectSortUpvote, setProjectSortUpvote] = useState(projects);
  const [projectSortDate, setProjectSortDate] = useState(projects);
  const [upvotedProjectsMap, setUpvotedProjectsMap] = useState(() => {
    return upvotedProjectIds.reduce((acc: Record<string, boolean>, projectId) => {
      acc[projectId] = true;
      return acc;
    }, {});
  });

  // to manage state of projects(update upvote count) and upvotedProjectsMap
  const handleUpvoteProjectState = (projectId: string, upvoted: boolean) => {
    setUpvotedProjectsMap((prevUpvotedProjectsMap) => {
      const newUpvotedProjectsMap = { ...prevUpvotedProjectsMap };
      newUpvotedProjectsMap[projectId] = upvoted;
      return newUpvotedProjectsMap;
    });
    setProjectsState((prevProjectsState) => {
      const newProjectsState = [...prevProjectsState];
      const projectIndex = newProjectsState.findIndex((project) => project.id === projectId);
      if (projectIndex === -1) {
        return prevProjectsState;
      }
      const project = { ...newProjectsState[projectIndex] };
      project.numUpvotes = upvoted ? project.numUpvotes + 1 : project.numUpvotes - 1;
      newProjectsState[projectIndex] = project;
      return newProjectsState;
    });
  };

  // this will make calls to the API, will call handleUpvoteProjectState (optimistic), and will revert by calling it again with the opposite value to revert state
  const onUpvoteProject = (projectId: string, upvoted: boolean) => {
    // window.alert("Disabled for the momment")
    //uncomment code to enable upvote functionality and comment/ remove above line
    // if user is not signed in, take them to sign in page
    if (!sessionObject) {
      // signIn("twitter");
      setPopup(true);
      return;
    }

    // make the update on frontend state regardless of the API response
    handleUpvoteProjectState(projectId, upvoted);

    // call the upvote project service
    upvoteProject(projectId, sessionObject.user.id, upvoted)
      .then()
      .catch((err) => {
        console.error(err);

        // undo the update from frontend side if the API call fails
        handleUpvoteProjectState(projectId, !upvoted);
      });
  };

  const handleSubmitProject = (): void => {
    console.log("ON click", sessionObject);
    !sessionObject
      ? setPopup(true)
      : window.open("https://airtable.com/shrIXaaf87BzaTfYy", " _blank");
  };

  const sort = () => {
    projectSort.sort(function (a, b) {
      const nA = a.name.toLowerCase();
      const nB = b.name.toLowerCase();

      if (nA < nB) return -1;
      else if (nA > nB) return 1;
      return 0;
    });
  };
  sort();

  console.log(projectSort);

  const sortUpvote = () => {
    projectSortUpvote.sort(function (a, b) {
      const nA = a.numUpvotes;
      const nB = b.numUpvotes;

      if (nA < nB) return -1;
      else if (nA > nB) return 1;
      return 0;
    });
  };
  sortUpvote();

  const sortDate = () => {
    projectSortUpvote.sort(function (a, b) {
      const nA = a.dateCreated;
      const nB = b.dateCreated;

      if (nA < nB) return -1;
      else if (nA > nB) return 1;
      return 0;
    });
  };
  sortDate();

  return (
    <>
      <ResponsiveHero
        heading="Explore the Shardeum Ecosystem"
        cta={
          <Button onClick={handleSubmitProject} variant="primary" size="lg" mt={8}>
            Submit your project
          </Button>
        }
        src={"/explore/shardeum-ecosystem-hero-img.png"}
      />

      {projectSort.length > 0 && (
        <ProjectsList
          projects={projectsState}
          categories={categories}
          upvoteMap={upvotedProjectsMap}
          onUpvoteProject={onUpvoteProject}
        />
      )}
      {projectSortUpvote.length > 0 && (
        <TrendingProjects
          projects={projectsState}
          upvoteMap={upvotedProjectsMap}
          onUpvoteProject={onUpvoteProject}
        />
      )}
      {projectSortDate.length > 0 && (
        <NewestProjects
          projects={projectsState}
          upvoteMap={upvotedProjectsMap}
          onUpvoteProject={onUpvoteProject}
        />
      )}

      <JoinCommunity />
    </>
  );
};

export default Explore;
