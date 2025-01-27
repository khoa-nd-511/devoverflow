import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { getQuestionById } from "@/lib/actions/question.action";
import { formatNumber, getTimestamp } from "@/lib/utils";
import { getUserById } from "@/lib/actions/user.action";
import Metric from "@/components/shared/Metric";
import ParsedHTML from "@/components/shared/ParsedHTML";
import Tag from "@/components/shared/Tag";
import AnswerForm from "@/components/forms/AnswerForm";
import AllAnswers from "@/components/shared/AllAnswers";
import UserDisplay from "@/components/shared/UserDisplay";
import Voting from "@/components/shared/Voting";
import { Schema } from "mongoose";
import { searchParamsSchema } from "@/lib/validations";

const QuestionDetailsPage = async ({
    params: { id },
    searchParams,
}: {
    params: { id: string };
    searchParams: unknown;
}) => {
    const { userId } = auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const parsedSearchParams = searchParamsSchema.parse(searchParams);

    const mongoUser = await getUserById({ clerkId: userId });

    const question = await getQuestionById({ questionId: id });

    const {
        author,
        title,
        createdAt,
        answers,
        views,
        description,
        tags,
        upvotes,
        downvotes,
    } = question;

    return (
        <>
            <div className="flex-start w-full flex-col">
                <div className="flex w-full flex-col-reverse gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                    <UserDisplay
                        id={String(author._id)}
                        name={author.name}
                        imgURL={author.picture}
                    />

                    <div className="flex w-full justify-end">
                        <Voting
                            id={id}
                            userId={String(mongoUser._id)}
                            type="question"
                            upvotes={upvotes.length}
                            downvotes={downvotes.length}
                            hasUpvoted={
                                mongoUser &&
                                upvotes.includes(
                                    mongoUser._id as Schema.Types.ObjectId
                                )
                            }
                            hasDownvoted={
                                mongoUser &&
                                downvotes.includes(
                                    mongoUser._id as Schema.Types.ObjectId
                                )
                            }
                            hasSaved={
                                mongoUser &&
                                mongoUser.saved.includes(
                                    question._id as Schema.Types.ObjectId
                                )
                            }
                        />
                    </div>
                </div>

                <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
                    {title}
                </h2>

                <div className="mr-auto mt-5 flex flex-wrap gap-4">
                    <Metric
                        imgURL="/assets/icons/clock.svg"
                        alt="Clcok icon"
                        value={` asked ${getTimestamp(createdAt)}`}
                        title=""
                        otherClasses="small-regular text-dark400_light800"
                    />
                    <Metric
                        imgURL="/assets/icons/message.svg"
                        alt="Message"
                        value={formatNumber(answers.length)}
                        title="Answers"
                        otherClasses="small-regular text-dark400_light800"
                    />
                    <Metric
                        imgURL="/assets/icons/eye.svg"
                        alt="eye"
                        value={formatNumber(views)}
                        title="Views"
                        otherClasses="small-regular text-dark400_light800"
                    />
                </div>
            </div>

            <div className="mb-8 mt-5 flex flex-wrap gap-2">
                {tags.map(({ name, _id }) => (
                    <Tag key={String(_id)} name={name} id={String(_id)} />
                ))}
            </div>

            <ParsedHTML data={description} />

            <div className="mt-10">
                <AllAnswers
                    questionId={id}
                    userId={String(mongoUser._id)}
                    filter={parsedSearchParams.filter}
                />
            </div>

            <div className="mt-20">
                <AnswerForm questionId={id} userId={String(mongoUser._id)} />
            </div>
        </>
    );
};

export default QuestionDetailsPage;
