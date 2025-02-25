'use client'

import Loader from '@/components/Loader';
import MeetingRoom from '@/components/MeetingRoom';
import MeetingSetUp from '@/components/MeetingSetUp';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { use, useState } from 'react'

const Meeting = ({params } : {params :Promise<{id :string}>}) => {
  const {id} = use(params);
  const {user,isLoaded} = useUser();
  const [isSetupComplete,setIsSetUpComplete] = useState(false);

  const {call,isCallLoading} = useGetCallById(id);
  if(!isLoaded || isCallLoading) return <Loader/>
  return (
    <main className="h-screen w-full ">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetUp setIsSetUpComplete={setIsSetUpComplete}/>
          ) : (
            <MeetingRoom/>
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting