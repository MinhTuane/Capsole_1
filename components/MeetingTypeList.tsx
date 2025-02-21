'use client'

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation';

const MeetingTypeList = () => {
    const [meeting, setMeeting] = useState<'isSchedualeMeeting' | 'isJoiningMeeting' | 
    'isInstantMeeting' | undefined>();
    const router = useRouter()
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            
            <HomeCard 
                img='/icons/add-meeting.svg'
                title='New Meeting'
                description='Start an instant meeting'
                handleClick={()=> setMeeting('isJoiningMeeting')}
                className='bg-orange-1'
            />
            <HomeCard 
                img='/icons/schedule.svg'
                title='Schedule Meeting'
                description='Plan your meeting'
                handleClick={()=> setMeeting('isSchedualeMeeting')}
                className='bg-blue-1'
            />
            <HomeCard 
                img='/icons/recordings.svg'
                title='View Recording'
                description='Check out your recordings'
                handleClick={()=> setMeeting('isJoiningMeeting')}
                className='bg-purple-1'
            />
            <HomeCard 
                img='/icons/join-meeting.svg'
                title='Join Meeting'
                description='Via invitation link'
                handleClick={()=> setMeeting('isJoiningMeeting')}
                className='bg-yellow-1'
            />

        </section>
    )
}

export default MeetingTypeList