import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { useEffect, useState } from "react"

export const useGetCalls = () => {
    const [calls, setcalls] = useState<Call[]>([]);
    const [isLoading, setisLoading] = useState(false)
    const client = useStreamVideoClient();
    const { user } = useUser();

    useEffect(() => {
        const loadCall = async () => {
            if (!client || !user?.id) return;

            setisLoading(true);

            try {
                const { calls } = await client.queryCalls({
                    sort: [{ field: 'starts_at', direction: -1 }],
                    filter_conditions: {
                        starts_At: { $exists: true },
                        $or: [
                            { create_by_user_id: user.id },
                            { members: { $in: [user.id] } }
                        ]
                    }
                });
                setcalls(calls)
            } catch (error) {
                console.log(error);

            } finally {
                setisLoading(false);
            }
        }
    }, [client, user?.id])
}