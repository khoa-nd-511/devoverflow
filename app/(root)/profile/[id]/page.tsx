import React from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { getUserInfo } from "@/lib/actions/user.action";
import { getJoinedDate } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileLink from "@/components/shared/ProfileLink";
import Stats from "@/components/shared/Stats";
import QuestionsTab from "@/components/shared/QuestionsTab";
import AnswersTab from "@/components/shared/AnswersTab";
import CTAButton from "@/components/shared/CTAButton";

const ProfilePage = async ({ params: { id } }: { params: { id: string } }) => {
    const { userId: clerkId } = auth();

    if (!clerkId) {
        return redirect("/sign-in");
    }

    const { user, totalAnswers, totalQuestions } = await getUserInfo({
        clerkId: id,
    });

    return (
        <>
            <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
                <div className="flex flex-col items-start gap-4 lg:flex-row">
                    <Image
                        src={user.picture}
                        width={140}
                        height={140}
                        alt="profile pic"
                        className="rounded-full object-cover"
                    />

                    <div className="mt-3">
                        <h2 className="h2-bold text-dark100_light900">
                            {user.name}
                        </h2>
                        <p className="paragraph-regular text-dark400_light800">
                            @{user.username}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center justify-start gap-5">
                            {user.location && (
                                <ProfileLink
                                    title={user.location}
                                    imgURL="/assets/icons/location.svg"
                                />
                            )}
                            {user.website && (
                                <ProfileLink
                                    title={user.website}
                                    href={user.website}
                                    imgURL="/assets/icons/link.svg"
                                />
                            )}

                            <ProfileLink
                                title={getJoinedDate(user.joinedAt)}
                                imgURL="/assets/icons/calendar.svg"
                            />
                        </div>

                        {user.bio && (
                            <p className="text-dark400_light700">{user.bio}</p>
                        )}
                    </div>
                </div>

                <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
                    <SignedIn>
                        {clerkId === user.clerkId && (
                            <CTAButton
                                href={`/profile/${id}/edit`}
                                label="Edit Profile"
                            />
                        )}
                    </SignedIn>
                </div>
            </div>

            <Stats
                totalAnswers={totalAnswers}
                totalQuestions={totalQuestions}
            />

            <div className="mt-10 flex gap-10">
                <Tabs defaultValue="top-posts" className="flex-1">
                    <TabsList className="background-light800_dark400 min-h-[42px] p-1">
                        <TabsTrigger className="tab" value="top-posts">
                            Top Posts
                        </TabsTrigger>
                        <TabsTrigger className="tab" value="answers">
                            Answers
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="top-posts">
                        <QuestionsTab
                            userId={String(user._id)}
                            clerkId={clerkId}
                            searchParams={{}}
                        />
                    </TabsContent>
                    <TabsContent value="answers">
                        <AnswersTab
                            clerkId={clerkId}
                            userId={String(user._id)}
                            searchParams={{}}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
};

export default ProfilePage;
