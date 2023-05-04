import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';

import {
    onAuthStateChanged,
} from "firebase/auth";

import { useAuthState } from 'react-firebase-hooks/auth';
import { db, auth } from "../../../../firebase";
import CustomModal from '@app/components/CustomModal';
import CustomLoader from '@app/components/CustomLoader';
import MainContentPD from '@app/components/ProjectDetails/MainContentPD';

interface MainContentProps {
    setIsOpen: (isOpen: boolean) => void;
    isOpen: boolean;
    currentMenuItem: number;
    setCurrentMenuItem: (currentMenuItem: number) => void;
    width: number;
    height: number;
}

const ProjectDetails: React.FC<MainContentProps> = (
    {
        setIsOpen,
        isOpen,
        currentMenuItem,
        setCurrentMenuItem,
        width,
        height
    }) => {
    const router = useRouter();
    const { email, projectName, projectID } = router.query;

    const [loading, setLoading] = useState<boolean>(true);

    //_________________ For Getting SignedInUser Data _____________________
    const [signedInUserData, setSignedInUserData] = useState<any>(null);
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
    //_________________ For Getting SignedInUser Data _____________________

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                if (signedInUserData === null) {
                    setIsSignedIn(true);
                    if (user.isAnonymous === true) {
                        let tempUser = {
                            displayName: "Anonymous",
                            email: `anonymous${user.uid}@guest.com`,
                            photoURL: user.photoURL
                        }
                        console.log(tempUser);
                        setSignedInUserData(tempUser);
                        setLoading(false);
                    } else {
                        console.log(user);
                        setSignedInUserData(user);
                        setLoading(false);
                    }
                    // ...
                }
            } else {
                // User is signed out
                console.log("User is signed out");
                setLoading(false);
                setSignedInUserData(null);
                setIsSignedIn(false);
                router.push("/");
                // ...
            }
        });
    }, [router, signedInUserData]);

    // Projects
    const [projects, setProjects] = useState<any>([]);
    // Project Members
    const [projectMembers, setProjectMembers] = useState<string[]>([]);
    // Project Sections
    const [projectSections, setProjectSections] = useState<any>([]);

    const [isModalOpen, setIsModalOpen] = React.useState(false);

    // Add Task Model
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = React.useState(false);

    /////////////////////////////////////// Database Part ////////////////////////////////////////////////

    const [widgetsList, setWidgetsList] = useState({
        backgroundImages: [
            "https://c4.wallpaperflare.com/wallpaper/846/485/162/5bd2cdacb2c97-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/425/94/409/windows-10-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/4/225/182/official-windows-10-windows-10-logo-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/61/864/865/windows-10-2-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/836/734/371/computer-texture-logo-window-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/531/951/621/digital-digital-art-artwork-illustration-minimalism-hd-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/175/524/956/digital-digital-art-artwork-fantasy-art-drawing-hd-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/741/22/369/digital-digital-art-artwork-fantasy-art-landscape-hd-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/772/543/720/close-up-photo-of-spiral-form-smoke-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/672/1017/136/digital-digital-art-artwork-photoshop-photography-hd-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/77/895/626/digital-digital-art-artwork-fantasy-art-photoshop-hd-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/503/618/348/digital-digital-art-artwork-drawing-digital-painting-hd-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/956/988/935/fantasy-art-digital-art-pixelated-artwork-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/457/139/736/artwork-digital-art-space-galaxy-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/681/554/339/abstract-planet-space-purple-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/616/719/787/stars-planet-space-mountains-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/262/774/423/space-stars-nebula-tylercreatesworlds-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/405/201/185/space-nebula-space-art-stars-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/616/719/787/stars-planet-space-mountains-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/457/139/736/artwork-digital-art-space-galaxy-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/924/779/736/space-planet-digital-art-space-art-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/941/701/99/space-multiple-display-earth-stars-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/476/68/43/space-blue-planet-dual-display-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/889/318/456/nebula-stars-space-green-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/853/586/450/universe-abstract-cube-gradient-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/450/780/877/pattern-rectangular-cube-digital-art-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/885/452/864/wireframe-low-poly-geometry-abstract-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/586/173/222/minimalism-gravity-abstract-digital-art-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/413/925/249/minimalism-abstract-pattern-digital-art-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/282/308/59/abstract-vector-red-purple-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/86/641/66/low-poly-minimalism-artwork-abstract-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/336/163/715/honeycombs-abstract-minimalism-simple-background-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/379/104/52/abstract-minimalism-simple-simple-background-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/753/409/178/minimalism-digital-art-simple-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/650/785/115/nebula-stars-space-green-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/181/793/111/colorful-minimalism-space-abstract-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/735/819/766/digital-art-abstract-artwork-shapes-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/521/584/20/abstract-digital-art-blue-windows-8-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/344/958/356/windows-10-windows-10-anniversary-logo-hd-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/608/468/955/digital-digital-art-artwork-drawing-digital-painting-hd-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/147/871/818/digital-digital-art-artwork-illustration-drawing-hd-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/533/163/784/digital-digital-art-artwork-illustration-minimalism-hd-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/799/610/330/blue-stars-mountains-starry-night-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/657/791/735/simple-background-nature-mountains-landscape-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/819/183/636/landscape-photography-of-wheat-field-under-gray-columbus-clouds-during-golden-hour-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/821/805/67/green-fern-leaf-plant-fern-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/1023/150/452/speed-limit-35-signage-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/829/247/731/grayscale-photo-of-storm-approaching-towards-isolated-house-wallpaper-preview.jpg",
            "https://images.pexels.com/photos/36767/tree-natur-nightsky-cloud.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/427900/pexels-photo-427900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/67563/plane-aircraft-jet-airbase-67563.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/326081/pexels-photo-326081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://images.pexels.com/photos/716834/pexels-photo-716834.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            "https://c4.wallpaperflare.com/wallpaper/720/949/141/mist-landscape-nature-sunset-wallpaper-preview.jpg",
            "https://c4.wallpaperflare.com/wallpaper/760/955/638/artwork-landscape-sky-mountains-wallpaper-preview.jpg"
        ],
        widgets: [{
            id: 1,
            src: <audio id='hoverSoundClip'>
                <source src="audio/1.mp3" />
                Your browser is not invited for super fun audio time.
            </audio>,
            name: "Projects",
            isVisible: true
        },
        {
            id: 2,
            src: <audio id='hoverSoundClip'>
                <source src="audio/2.mp3" />
                Your browser is not invited for super fun audio time.
            </audio>,
            name: "My Tasks",
            isVisible: true
        },
        {
            id: 3,
            src: <audio id='hoverSoundClip'>
                <source src="audio/3.mp3" />
                Your browser is not invited for super fun audio time.
            </audio>,
            name: "People",
            isVisible: true
        },
            // {
            //     id: 4,
            //     src: <audio id='hoverSoundClip'>
            //         <source src="audio/4.mp3" />
            //         Your browser is not invited for super fun audio time.
            //     </audio>,
            //     name: "Tasks I've Assigned",
            //     isVisible: false
            // },
            // {
            //     id: 5,
            //     src: <audio id='hoverSoundClip'>
            //         <source src="audio/5.mp3" />
            //         Your browser is not invited for super fun audio time.
            //     </audio>,
            //     name: "My goals",
            //     isVisible: false
            // },
            // {
            //     id: 6,
            //     src: <audio id='hoverSoundClip'>
            //         <source src="audio/6.mp3" />
            //         Your browser is not invited for super fun audio time.
            //     </audio>,
            //     name: "Manager Tasks",
            //     isVisible: false
            // }
        ]
    });

    const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(
        // Randomly pick from the backgroundImages list
        widgetsList.backgroundImages[Math.floor(Math.random() * widgetsList.backgroundImages.length)]
    );

    useEffect(() => {
        document.documentElement.style.setProperty("--selected-bg-image", `url(${selectedBackgroundImage})`);
    }, [selectedBackgroundImage]);

    return (
        <div>
            <Head>
                <title>Project Details - TaskEncher (Supercharge Your Workflow and Amplify Task Management) </title>
                <meta charSet="utf-8" lang='en' />
                <meta name="description" content="Project Management Software" />
                <link rel="icon" href="/logocopy.ico" />
            </Head>
            {(!loading && isSignedIn) && (
                <>
                    <MainContentPD
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        currentMenuItem={currentMenuItem}
                        setCurrentMenuItem={setCurrentMenuItem}
                        signedInUserData={signedInUserData}
                        isSignedIn={isSignedIn}
                        width={width}
                        height={height}
                        email={signedInUserData.email}
                        isModalOpen={isModalOpen}
                        setIsModalOpen={setIsModalOpen}

                        // Project Members
                        projectMembers={projectMembers}
                        setProjectMembers={setProjectMembers}

                        // Projects
                        projects={projects}
                        setProjects={setProjects}

                        // Project Sections
                        projectSections={projectSections}
                        setProjectSections={setProjectSections}

                        projectName={projectName}
                        projectID={projectID}

                        // Add Task Model
                        isAddTaskModalOpen={isAddTaskModalOpen}
                        setIsAddTaskModalOpen={setIsAddTaskModalOpen}

                        // Invited Members Modal
                        isInvitedMembersModalOpen={isModalOpen}
                        setIsInvitedMembersModalOpen={setIsModalOpen}
                    />
                </>
            )}

            <CustomModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                modalType='inviteMembers'
                title='Add people to TaskEncher Software'
                projects={projects}
                projectMembers={projectMembers}
            />

            <CustomModal
                open={isAddTaskModalOpen}
                setOpen={setIsAddTaskModalOpen}
                modalType="addTasks"
                title='Add Task'
                projects={projects}
                projectMembers={projectMembers}
                projectSections={projectSections}
                email={(signedInUserData !== null) ? (signedInUserData.email) : ("")}
                projectID={projectID?.toString()}
            />

        </div>
    )
}

export default ProjectDetails;
