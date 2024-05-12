'use client'
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function ProfilePage() { //! snippet prc


    const { data: session } = useSession();

    useEffect(() => {
        console.log('Client Side')
    }, [])

    return (
        <div>
            <h1>Page Profile</h1>
            <hr />
            <div className="flex flex-col">
                <span>{session?.user?.name ?? 'No name'}</span>
                <span>{session?.user?.email ?? 'No email'}</span>
                <span>{session?.user?.image ?? 'No image'}</span>
            </div>
        </div>
    );
}