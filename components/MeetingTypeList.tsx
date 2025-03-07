'use client'

import React, { useState } from 'react'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { Input } from './ui/input';


const MeetingTypeList = () => {
    const [meeting, setMeeting] = useState<'isSchedualeMeeting' | 'isJoiningMeeting' |
        'isInstantMeeting' | undefined>();

    const router = useRouter();
    const { user } = useUser();
    const client = useStreamVideoClient();
    const [values, setValues] = useState({
        dateTime: new Date(),
        description: "",
        link: '',
    })

    const [callDetail, setCallDetail] = useState<Call>();

    const createMeeting = async () => {
        if (!client || !user) return;

        try {
            if (!values.dateTime) {
                toast.info("Please select a date and time!!")
                return;
            }
            const id = crypto.randomUUID();
            const call = client.call('default', id);
            if (!call) throw new Error('Failed to create call')

            const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.description || "Instant meeting";

            await call.getOrCreate({
                data: {
                    starts_at: startAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetail(call);

            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }

            toast.success("Meeting Created!!")

        } catch (error) {
            console.log(error);
            toast.error("Failed to create meeting!!")
        }
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>

            <HomeCard
                img='/icons/add-meeting.svg'
                title='New Meeting'
                description='Start an instant meeting'
                handleClick={() => setMeeting('isInstantMeeting')}
                className='bg-orange-1'
            />
            <HomeCard
                img='/icons/schedule.svg'
                title='Schedule Meeting'
                description='Plan your meeting'
                handleClick={() => setMeeting('isSchedualeMeeting')}
                className='bg-blue-1'
            />
            <HomeCard
                img='/icons/recordings.svg'
                title='View Recording'
                description='Check out your recordings'
                handleClick={() => router.push('/recordings')}
                className='bg-purple-1'
            />
            <HomeCard
                img='/icons/join-meeting.svg'
                title='Join Meeting'
                description='Via invitation link'
                handleClick={() => setMeeting('isJoiningMeeting')}
                className='bg-yellow-1'
            />
            {!callDetail ? (
                <MeetingModal
                    isOpen={meeting === 'isSchedualeMeeting'}
                    onClose={() => setMeeting(undefined)}
                    title="Create Meeting"
                    handleClick={createMeeting}
                >
                    <div className="flex flex-col gap-2.5">
                        <label htmlFor="" className="text-base text-normal leading-[22px]">Add a description</label>
                        <Textarea
                            className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0'
                            onChange={(e) => setValues({ ...values, description: e.target.value })}

                        />
                    </div>
                    <div className="flex w-full flex-col gap-2.5">
                    <label htmlFor="" className="text-base text-normal leading-[22px]">Select date and time</label>
                    <ReactDatePicker selected={values.dateTime}
                        onChange={(date) => setValues({...values,dateTime:date!})}
                        showTimeSelect
                        timeFormat='HH:mm'
                        timeIntervals={15}
                        timeCaption='time'
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className='w-full rounded bg-dark-3 p-2 focus: outline-none'
                    />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meeting === 'isSchedualeMeeting'}
                    onClose={() => setMeeting(undefined)}
                    title="Meeting Created"
                    className="text-center"
                    buttonText='Copy meeting Link'
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink);
                        toast.success("Link copied");
                    }}
                    image='/icons/checked.svg'
                    buttonIcon='/icons/copy.svg'
                />
            )}
            <MeetingModal
                isOpen={meeting === 'isInstantMeeting'}
                onClose={() => setMeeting(undefined)}
                title="start an Instant Meeting"
                className="text-center"
                buttonText='Start-Meeting'
                handleClick={createMeeting}
            />
            <MeetingModal
                isOpen={meeting === 'isJoiningMeeting'}
                onClose={() => setMeeting(undefined)}
                title="Type the link here"
                className="text-center"
                buttonText='Join-Meeting'
                handleClick={()=> router.push(values.link)}
            >
                <Input 
                placeholder='Meeting Link'
                className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0' 
                onChange={(e) => setValues({...values,link:e.target.value})}
                />
            </MeetingModal>


        </section>
    )
}

export default MeetingTypeList