'use client'

import { Button, Spinner } from "@nextui-org/react";
import Loader from "./loader";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RecommendedOrganization, { RecommendedOrganizationData } from "./recommended-organization";
import { sampleRecommendedOrganizations } from "./sample-data";
import { MyContext } from "../MyContext";

type RequestInput = {
  name: string,
  year: string,
  major: string,
  list_of_orgs: string[]
}

function createFetchRequestUrl(input: RequestInput) {
  const { name, year, major, list_of_orgs } = input;

  const baseUrl = "http://127.0.0.1:5000";

  // Create a URLSearchParams object to easily handle query parameters
  const params = new URLSearchParams();

  // Add parameters if they exist
  if (name) params.append('name', name);
  if (year) params.append('year', year);
  if (major) params.append('major', major);

  // Add each organization to the query parameters
  if (Array.isArray(list_of_orgs)) {
    list_of_orgs.forEach(org => params.append('list_of_orgs', org));
  }

  // Construct the full URL with query parameters
  return `${baseUrl}?${params.toString()}`;
}

export default function GetRecommendations() {
  const router = useRouter()
  const [recommendationLoading, setRecommendationsLoading] = useState<boolean>(true);
  const [backButtonLoading, setBackButtonLoading] = useState<boolean>(false);
  const context = useContext(MyContext)
  const [recommendations, setRecommendations] = useState<RecommendedOrganizationData[]>([])

  async function getRecommendations() {
    const fullname = context?.data?.firstName + ' ' + context?.data?.lastName;
    const requestString = createFetchRequestUrl({
      name: fullname,
      major: context!.data!.major,
      year: context!.data!.year,
      list_of_orgs: context!.data!.list_of_orgs
    })

    const result = await fetch(requestString)
    const data = await result.json();
    const orgs = Object.keys(data[fullname])
    setRecommendations(orgs.map(o => {
      return {
        name: o,
        description: "",
        image: "",
      }
    }))
  }

  useEffect(() => {
    async function f() {
      await getRecommendations();
      setRecommendationsLoading(false)
    }
    f()
  }, [])

  const handleBackButtonClicked = () => {
    setBackButtonLoading(true);
    router.push('/home');
  }

  return <div className="flex flex-col items-center gap-4 py-20">
    {
      recommendationLoading ? <>
        <Loader />
        <div>Computing your recommendations...</div>
      </> : <>
        <h4 className="animate-fadeIn opacity-0">Here are a few organizations you might be interested in:</h4>
        <div className="flex flex-col items-center gap-4">
          {recommendations.map((org, index) => <RecommendedOrganization key={index} data={org} style={{ animationDelay: `${(index + 1) * 500}ms` }} />)}
        </div>
        <Button isLoading={backButtonLoading} onClick={handleBackButtonClicked} color="primary" radius="full" style={{ animationDelay: `${(recommendations.length + 1) * 500}ms` }} className="animate-fadeInAndFall opacity-0">Back</Button>
      </>
    }

  </div>
}