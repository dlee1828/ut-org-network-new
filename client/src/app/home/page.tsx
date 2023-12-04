'use client'

import { Button } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react";
import { MyContext } from "../MyContext";


export default function Home() {
  const router = useRouter();
  const [editProfileButtonLoading, setEditProfileButtonLoading] = useState<boolean>(false);
  const [getRecommendationsButtonLoading, setGetRecommendationsButtonLoading] = useState<boolean>(false);
  const [signOutButtonLoading, setSignOutButtonLoading] = useState<boolean>(false);

  const context = useContext(MyContext)

  if (!context) {
    throw new Error('MyComponent must be used within a MyProvider');
  }

  const { data, setData } = context;

  useEffect(() => {
    // f();
  }, [])

  const handleEditProfileClicked = () => {
    setEditProfileButtonLoading(true);
    router.push('/edit-profile');
  }

  const handleGetRecommendationsClicked = () => {
    setGetRecommendationsButtonLoading(true);
    router.push('/get-recommendations');
  }

  const handleSignOutClicked = () => {
    setSignOutButtonLoading(true);
    router.push('/');
  }

  return <div className="flex flex-col items-center pt-28 gap-8">
    <div className="text-3xl pb-8">Hi Daniel! What would you like to do?</div>
    <Button isLoading={editProfileButtonLoading} onClick={handleEditProfileClicked} radius="full" className="h-16 w-60 text-lg bg-gradient-to-tr from-blue-500 to-pink-500 text-white shadow-lg">Edit My Profile</Button>
    <Button isLoading={getRecommendationsButtonLoading} onClick={handleGetRecommendationsClicked} radius="full" className="h-16 w-60 text-lg bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg">Get Recommendations!</Button>
    <Button isLoading={signOutButtonLoading} onClick={handleSignOutClicked} radius="full" className="shadow-lg" color="primary">Sign Out</Button>
  </div>
}